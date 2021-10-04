import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/dto/order';
import { OrderService } from 'src/app/services/rest/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[] | undefined;
  currentOrderId: number = -1;

  constructor(private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.url);
    this.orderService.getOrders().subscribe(
      ordersReceived => {
        this.orders = ordersReceived;
      }
    )
  }

  updateCurrentId(id: number) {
    this.currentOrderId = this.currentOrderId == id ? -1 : id;
    if (this.currentOrderId == -1) {
      this.router.navigate(['.'], { relativeTo: this.route });
    }
  }

}
