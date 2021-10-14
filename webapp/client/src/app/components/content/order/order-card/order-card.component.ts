import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/dto/order';
import { OrderService } from 'src/app/services/rest/order.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit, OnDestroy {

  id: number = -1;
  order: Order | undefined;
  orderChangeSubscription: Subscription | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      param => this.loadOrder(param.id)
    );
  }

  ngOnDestroy(): void {
    this.orderChangeSubscription?.unsubscribe();
  }

  loadOrder(id: number) {
    console.log("chargement de l'order " + id);
    if (isNaN(id)) {
      //TODO: exception si isNaN
      this.order = undefined;
    } else {
      this.id = id;
      if (id != -1) {
        this.orderService.getOrder(id).subscribe(
          orderReceived => { this.order = orderReceived; }
        )
      }
    }
  }

}
