import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/dto/address';
import { DeliveryPoint } from 'src/app/dto/deliverypoint';
import { LoadingPoint } from 'src/app/dto/loadingpoint';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PlacesService {

    loadingPointUrl: string = environment.apiUrl + "loadingpoints/";
    deliveryPointUrl: string = environment.apiUrl + "deliverypoints/"

    constructor(private http: HttpClient) { }

    getLoadingPoints(): Observable<LoadingPoint[]> {
        return this.http.get<LoadingPoint[]>(this.loadingPointUrl);
    }

    getLoadingPoint(id: number): Observable<LoadingPoint> {
        return this.http.get<LoadingPoint>(this.loadingPointUrl + id);
    }

    getDeliveryPoints(): Observable<DeliveryPoint[]> {
        return this.http.get<DeliveryPoint[]>(this.deliveryPointUrl);
    }

    getDeliveryPoint(id: number): Observable<LoadingPoint> {
        return this.http.get<DeliveryPoint>(this.deliveryPointUrl + id);
    }

    toString(address: Address) {
        return address.addressLine + " - " + (address.zipcode ? address.zipcode + " " : "") + address.city;
    }
}