import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlacesService } from 'src/app/services/rest/places.service';
import { StockService } from 'src/app/services/rest/stock.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  productName: string | undefined;
  loadingPoints: Map<number, string> = new Map();
  quantities: Map<number, number> | undefined;
  productChangeSubscription: Subscription | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private stockService: StockService,
    private placesService: PlacesService) { }

  ngOnInit(): void {
    this.placesService.getLoadingPoints().subscribe(loadingPointsReceived => {
      loadingPointsReceived.forEach(
        loadingPoint => {
          this.loadingPoints.set(loadingPoint.id, this.placesService.toString(loadingPoint.address));
        }
      )
      this.productChangeSubscription = this.activatedRoute.params.subscribe(
        params => this.loadProduct(params.id)
      )
    });
  }

  private loadProduct(id: number): void {
    this.quantities = new Map();
    this.stockService.getProduct(id).subscribe(
      productReceived => {
        productReceived.stocks.forEach(stock => this.quantities?.set(stock.loadingPointId, stock.quantity))
        this.productName = productReceived.name;
      }
    )
  }

}
