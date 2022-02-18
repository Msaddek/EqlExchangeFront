import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Currency} from "../explorer/state/currency";
import {HttpErrorResponse} from "@angular/common/http";
import {CurrencyService} from "../explorer/service/currency.service";
import {PaymentService} from "./service/payment.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-refill',
  templateUrl: './refill.component.html',
  styleUrls: ['./refill.component.scss']
})
export class RefillComponent implements OnInit {

  constructor(private currencyService: CurrencyService, private paymentService: PaymentService, private router: Router) {
  }

  isSuccess: boolean = false;
  public form!: FormGroup;
  currencies!: Currency[];

  ngOnInit(): void {
    this.getCurrencies();
    this.form = new FormGroup({
      currencyTicker: new FormControl(),
      userEmail: new FormControl(sessionStorage.getItem('email')),
      montant: new FormControl(1)
    });
  }

  public getCurrencies(): void {
    this.currencyService.getAllCurrencies().subscribe({
        next: (response: Currency[]) => {
          this.currencies = response || [];
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    );
  }

  public doPayment() {
    console.log(this.form.value);
    this.paymentService.sendPayment(this.form.value).subscribe({

      error: (error: HttpErrorResponse) => {
          alert(error)
      },

      complete: () => {
        this.isSuccess = true;
        setTimeout(()=>{
          this.router.navigate(['eqlexchange/wallet']);
        }, 1000);
      }
      }
    )
  }

}
