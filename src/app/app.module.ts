import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {HomeModule} from "./home/home.module";
import {RouterModule} from "@angular/router";
import {NavsideModule} from "./navside/navside.module";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import { ChartComponent } from './chart/chart.component';
import {CommonModule} from "@angular/common";
import {WalletModule} from "./wallet/wallet.module";
import { ExplorerComponent } from './explorer/explorer.component';
import {MatTableModule} from "@angular/material/table";
import { TradeComponent } from './trade/trade.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioModule} from "@angular/material/radio";
import {TradeModule} from "./trade/trade.module";
import { TransactionsComponent } from './transactions/transactions.component';
import {MatSelectModule} from "@angular/material/select";
import {RefillModule} from "./refill/refill.module";
import {MatListModule} from "@angular/material/list";
import { TransferComponent } from './transfer/transfer.component';
import {TransferModule} from "./transfer/transfer.module";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartComponent,
    ExplorerComponent,
    TradeComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    WalletModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    NavsideModule,
    NoopAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    TradeModule,
    MatSelectModule,
    MatInputModule,
    RefillModule,
    MatListModule,
    TransferModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
