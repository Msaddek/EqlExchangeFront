import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Asset} from "../state/asset";
import {environment} from "../../../environments/environment";
import {Price} from "../state/price";

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private apiServer = environment.apiWalletUrl;
  private apiPrice = environment.apiMatchingEngine;
  private email = sessionStorage.getItem('email');

  constructor(private http: HttpClient) {
  }

  public getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.apiServer}/userAssets?userEmail=${this.email}`)
  }

  public getLastPrice(pair: string): Observable<Price> {
    return this.http.get<Price>(`${this.apiPrice}/price/getLastPrice?pair=${pair}`);
  }

  public getWalletAmount(assets: Asset[]): Observable<number> {
    let amount: number = 0;
    let result = new Subject<number>();
    for (let asset of assets) {
      if (asset.currencyTicker == 'EUR') {
        amount += asset.amount
      }
       if (asset.currencyTicker != 'EUR'){
        this.getLastPrice(asset.currencyTicker + '_EUR').subscribe(
          {
            next: (response: Price) => {
              amount += response.price * asset.amount;
              result.next(amount);
            },
            error: (error: HttpErrorResponse) => {
              console.log(error)
            }
          }
        );
      }
    }
    return result.asObservable()
  }

  public getAssetByTicker(ticker: string): Observable<Asset> {
    return this.http.get<Asset>(`${this.apiServer}/userAsset?userEmail=${this.email}&currencyTicker=${ticker}`);
  }
}
