import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SchedulingToSave } from 'src/app/dto/creations/scheduling-to-save';
import { Product } from 'src/app/dto/product';
import { Scheduling } from 'src/app/dto/scheduling';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StockService {

    url: string = environment.apiUrl + "products/";
    sendingUrl: string = environment.apiUrl + "sendlisting/"
    schedulingUrl: string = environment.apiUrl + "scheduledsendings/"

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

    sendListingTo(email: string): Observable<void> {
        return this.http.put<void>(this.sendingUrl + email, null);
    }

    scheduleSendingTo(email: string, cron: string): Observable<number> {
        return this.http.post<number>(this.schedulingUrl, new SchedulingToSave(cron, email));
    }

    getScheduleSendings(): Observable<Scheduling[]> {
        return this.http.get<Scheduling[]>(this.schedulingUrl);
    }

    getScheduleSending(id: number): Observable<Scheduling> {
        return this.http.get<Scheduling>(this.schedulingUrl + id);
    }

    cancelScheduleSending(id: number) {
        this.http.delete(this.schedulingUrl + id).subscribe();
    }

}