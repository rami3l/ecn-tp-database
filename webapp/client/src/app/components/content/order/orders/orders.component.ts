import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/dto/order';
import { OrderService } from 'src/app/services/rest/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[] | undefined;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      ordersReceived => {
        this.orders = ordersReceived;
      }
    )
  }

}
