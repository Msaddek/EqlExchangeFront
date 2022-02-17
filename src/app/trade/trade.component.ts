import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {TradeOrderService} from "./service/trade-order.service";
import {HttpErrorResponse} from "@angular/common/http";
import {OrderService} from "../transactions/service/order.service";
import {Order} from "../transactions/state/order";
import {AssetService} from "../wallet/service/asset.service";

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent implements OnInit {

  displayedColumns: string[] = ['Date', 'Type', 'Pair', 'Amount', 'Limit', 'Status'];
  public isTransfer: boolean = false;
  public form!: FormGroup;
  public currencyId!: string;
  public assetAmount!: number;
  public balance: number = 0;
  public orders!: Order[];
  public pair!: string;
  typeControl = new FormControl('BID');

  constructor(private route: ActivatedRoute, private tradeOrderService: TradeOrderService,
              private orderService: OrderService, private assetService: AssetService) {

  }

  ngOnInit(): void {
    this.isTransfer = false;
    this.currencyId = <string>this.route.snapshot.paramMap.get('id');
    this.pair = this.currencyId + '_EUR';
    this.getAsset(this.currencyId);
    this.getTradeOrders();
    this.getBalance();
    this.form = new FormGroup({
      user: new FormControl(sessionStorage.getItem('email')),
      currencyPair: new FormControl(this.pair),
      orderType: this.typeControl,
      amount: new FormControl(0, {validators: this.controlAmountToSell()}),
      limitPrice: new FormControl(0, {validators: this.controlLimitPrice()})
    });
  }

  private getBalance(){
    this.assetService.getAssetByTicker('EUR').subscribe({
      next: (response) => {
        this.balance = response.amount;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  private getAsset(ticker: string) {
    this.assetService.getAssetByTicker(ticker).subscribe({
      next: (response) => {
        this.assetAmount = response.amount;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public getMaxLimit(): number {
    let amount: number = this.form.get('amount')?.value;
    let result = 0;
    if(amount != 0) {
      return (this.balance / amount);
    }
    else return 0;
  }

  public sendTradeOrder() {
    this.tradeOrderService.addTradeOrder(this.form.value).subscribe({
        next: () => {
          this.isTransfer = true;
        },
        error: (error: HttpErrorResponse) => {
          alert(error)
        },
        complete: () => this.getTradeOrders()
      }
    )
  }

  private getTradeOrders() {
    this.orderService.getOrdersByPair(this.pair).subscribe({
      next: (response:Order[]) => {
        this.orders = response.reverse();
    },
      error: (error: HttpErrorResponse) => {
        alert(error);
      }
    });
  }

  private controlLimitPrice(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(this.form != undefined && this.form.get('orderType')?.value =='BID') {
        let isValid: boolean;
        isValid = control.value <= this.getMaxLimit() && control.value >= 0;
        return !isValid ? {validLimit: true} : null;
      } else {
        return null;
      }
    };
  }

  private controlAmountToSell(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(this.form != undefined && this.form.get('orderType')?.value =='ASK') {
        let isValid: boolean;
        isValid = control.value <= this.assetAmount && control.value > 0;
        return !isValid ? {validAmount: true} : null;
      } else {
        return null;
      }
    };
  }

}
