import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/dto/order';
import { OrderContent } from 'src/app/dto/ordercontent';
import { OrderService } from 'src/app/services/rest/order.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit, OnDestroy {

  order: Order | undefined;
  orderContents: OrderContent[] = [];
  orderChangeSubscription: Subscription | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      param => this.loadOrderWithOrderContents(param.id)
    );
  }

  ngOnDestroy(): void {
    this.orderChangeSubscription?.unsubscribe();
  }

  loadOrderWithOrderContents(id: number) {
    console.log("chargement de l'order " + id);
    if (isNaN(id)) {
      //TODO: exception si isNaN
      this.order = undefined;
    } else {
      this.orderService.getOrder(id).subscribe(
        orderReceived => { this.order = orderReceived; }
      )
      this.orderService.getOrderContentsDetailedByOrder(id).subscribe(
        orderContentsReceived => { this.orderContents = orderContentsReceived; }
      )
    }
  }

}
