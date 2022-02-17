import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {AssetService} from '../../service/asset.service';
import {Asset} from '../../state/asset';
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/User";
import {Currency} from "../../../explorer/state/currency";
import {CurrencyService} from "../../../explorer/service/currency.service";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  public assets!: Asset[];
  public user!: User;
  currencies!: Currency[];
  amount!: number;
  displayedColumns: string[] = ['Logo', 'Currency', 'Units'];

  constructor(private assetService: AssetService, private userService: UserService,
              private currencyService: CurrencyService) {
  }

  public ngOnInit(): void {
    this.getUser();
    this.getAssets();
    this.getCurrencies();
  }

  public getUser(): void {
    this.userService.getCurrentUser().subscribe(
      {
        next: (response: User) => {
          this.user = response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error);
        }
      }
    )
  }

  public getAssets(): void {
    this.assetService.getAssets().subscribe(
      {
        next: (response: Asset[]) => {
          this.assets = response || [];
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
        complete: () => this.getAmount()
      }
    );
  }

  public getAmount(): void {
    this.assetService.getWalletAmount(this.assets).subscribe( {
     next: (response:number) => {
       this.amount = response;
     }
    });
  }

  public getAssetAmount(ticker: string): number {
    let result = 0;

    for (let asset of this.assets) {
      if (asset.currencyTicker == ticker && ticker) {
        if (ticker === 'EUR') {
          return asset.amount;
        }
        result = asset.amount * this.getCurrencyAmountByTicker(ticker);
      }
    }
    return result;
  }

  private getCurrencyAmountByTicker(ticker: string): number {
    let result = 0;
    if(this.currencies != undefined){

      for (let currency of this.currencies) {
        if (currency.ticker == ticker) {
          result = currency.price;
        }
      }
    }
    return result;
  }

  public getCurrencies(): void {
    this.currencyService.getAllCurrencies().subscribe({
        next: (response: Currency[]) => {
          this.currencies = response || [];
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      }
    );
  }

}
