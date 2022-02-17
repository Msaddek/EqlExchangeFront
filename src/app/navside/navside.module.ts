import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavsideComponent} from "./component/navside/navside.component";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";
import {HomeComponent} from "../home/component/home/home.component";
import {WalletComponent} from "../wallet/component/wallet/wallet.component";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import { LogoutComponent } from './component/logout/logout.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {ExplorerComponent} from "../explorer/explorer.component";
import {ExplorerModule} from "../explorer/explorer.module";
import {TradeComponent} from "../trade/trade.component";
import {TransactionsComponent} from "../transactions/transactions.component";
import {RefillComponent} from "../refill/refill.component";
import { TransferComponent } from '../transfer/transfer.component';
import { UserComponent } from '../user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'eqlexchange', component: NavsideComponent, canActivate: [AuthGuard] , children: [
      { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
      { path: 'explorer', component: ExplorerComponent, canActivate: [AuthGuard]},
      { path: 'explorer/trade/:id', component: TradeComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
      { path: 'refill', component: RefillComponent, canActivate: [AuthGuard] },
      { path: 'transfer', component: TransferComponent, canActivate: [AuthGuard] },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] }
] }
];


@NgModule({
  declarations: [
    NavsideComponent,
    LogoutComponent
  ],
  exports: [
    NavsideComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    MatListModule,
    ExplorerModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
  ]
})
export class NavsideModule { }
