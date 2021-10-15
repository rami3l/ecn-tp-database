import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/dto/order';
import { OrderContent } from 'src/app/dto/ordercontent';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class OrderService {

    orderUrl: string = environment.apiUrl + "orders/";
    orderContentUrl: string = environment.apiUrl + "ordercontents/";

    constructor(private http: HttpClient) { }

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(this.orderUrl);
    }

    getOrdersDetailed(): Observable<Order[]> {
        return this.http.get<Order[]>(this.orderUrl + "details");
    }

    getOrder(id: number): Observable<Order> {
        return this.http.get<Order>(this.orderUrl + id);
    }

    getOrderContents(): Observable<OrderContent[]> {
        return this.http.get<OrderContent[]>(this.orderContentUrl);
    }

    getOrderContentsDetailed(): Observable<OrderContent[]> {
        return this.http.get<OrderContent[]>(this.orderContentUrl + "details");
    }

    getOrderContentsUnsupportedDetailed(): Observable<OrderContent[]> {
        return this.http.get<OrderContent[]>(this.orderContentUrl + "unsupported/details");
    }

    getOrderContentsDetailedByOrder(orderId: number): Observable<OrderContent[]> {
        return this.http.get<OrderContent[]>(this.orderUrl + orderId + "/ordercontents/details");
    }

    getOrderContent(id: number): Observable<OrderContent> {
        return this.http.get<OrderContent>(this.orderContentUrl + id);
    }
}