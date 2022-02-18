import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import {CurrencyService} from '../explorer/service/currency.service';
import {Currency} from '../explorer/state/currency';
import {PaymentService} from '../refill/service/payment.service';
import {ResultTransferDto} from 'src/app/transfer/state/resultTransferDto';
import {Router} from '@angular/router';
import {AssetService} from "../wallet/service/asset.service";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  constructor(private currencyService: CurrencyService, private paymentService: PaymentService,
              private router: Router, private assetService: AssetService) {
  }

  public form!: FormGroup;
  currencies!: Currency[];
  isSuccess: boolean = false;
  isTransfertOk: boolean = false;
  resultMessage!: String;
  assetAmount: number = 0

  ngOnInit(): void {
    this.getCurrencies();
    this.form = new FormGroup({
      userEmail: new FormControl(sessionStorage.getItem('email')),
      currencyTicker: new FormControl('BTC'),
      walletAdresse: new FormControl(),
      amount: new FormControl(0, {validators: this.controlAmount()})
    });
    this.getAssetAmount();
  }

  doTransfer() {
    this.paymentService.doTransfer(this.form.value).subscribe({
      error: (error: HttpErrorResponse) => {
        alert(error)
      },
      next: (resultTransferDto: ResultTransferDto) => {
        this.isSuccess = true;
        if (resultTransferDto.transfertOk) {
          this.isTransfertOk = true;
          this.resultMessage = 'Successfully !';
          setTimeout(() => {
            this.router.navigate(['eqlexchange/wallet']);
          }, 1000);
        } else {
          this.resultMessage = resultTransferDto.message;
        }
      }
    });
  }

  public getAssetAmount() {
    if (this.form != undefined) {
      let ticker = this.form.get('currencyTicker')?.value;
      this.assetService.getAssetByTicker(ticker).subscribe({
        next: (response) => {
          this.assetAmount = response.amount;
        },
        error: (error) => {
          console.log(error);
        }
      });
    }

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

  private controlAmount(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(this.form != undefined) {
        let isValid: boolean;
        isValid = control.value <= this.assetAmount && control.value >= 0;
        return !isValid ? {validAmount: true} : null;
      } else {
        return null;
      }
    };
  }

}
