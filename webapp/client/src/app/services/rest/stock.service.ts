import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/dto/product';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StockService {

    url: string = environment.apiUrl + "products/";

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.url);
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(this.url + id);
    }

    getProductQuantity(id: number): Observable<number> {
        return this.http.get<number>(this.url + id + "/quantity");
    }

    getProductQuantityByLoadingPoint(id: number, loadingPointId: number): Observable<number> {
        return this.http.get<number>(this.url + id + "/quantity/" + loadingPointId);
    }
}