import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/dto/product';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StockService {

    url: string = environment.apiUrl + "missions/";

    constructor(private http: HttpClient) { }

    getPrducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.url);
    }

    // getPrduct(id: number): Observable<Product> {
    //     return this.http.get<Product>(this.url + id);
    // }
}