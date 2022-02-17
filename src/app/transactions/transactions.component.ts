import { Component, OnInit } from '@angular/core';
import {OrderService} from "./service/order.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Order} from "./state/order";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  displayedColumns: string[] = ['Date', 'Type', 'Pair', 'Amount', 'Limit', 'Status'];
  orders!: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders()
  }

  public getOrders(): void {
    this.orderService.getCurrentUserOrders().subscribe({
        next: (response: Order[]) => {
          this.orders = response.reverse();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      }
    );
  }

}
