import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/dto/product';
import { StockService } from 'src/app/services/rest/stock.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] | undefined;
  quantities: Map<number, number> = new Map();

  constructor(private stockService: StockService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.stockService.getProducts().subscribe(
      productsReceived => {
        this.products = productsReceived;
        this.products.forEach(product => {
          this.setProductQuantity(product.id);
        })
      }
    )
  }

  private setProductQuantity(id: number): void {
    this.stockService.getProductQuantity(id).subscribe(
      quantityReceveid => {
        if (quantityReceveid) {
          this.quantities.set(id, quantityReceveid);
        }
      }
    );
  }

  checkState(state: boolean) {
    if (state) {
      this.router.navigate(['.'], { relativeTo: this.route });
    }
  }

}
