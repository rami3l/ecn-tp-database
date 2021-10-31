import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Driver } from 'src/app/dto/driver';
import { Truck } from 'src/app/dto/truck';
import { Unavailability } from 'src/app/dto/unavailability';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TransportService {

    truckUrl: string = environment.apiUrl + "trucks/";
    driverUrl: string = environment.apiUrl + "drivers/";

    constructor(private http: HttpClient) { }

    getTrucks(): Observable<Truck[]> {
        return this.http.get<Truck[]>(this.truckUrl);
    }

    getTruck(licensePlate: string): Observable<Truck> {
        return this.http.get<Truck>(this.truckUrl + licensePlate);
    }

    getAssignedDriver(licensePlate: string): Observable<Driver> {
        return this.http.get<Driver>(this.truckUrl + licensePlate + "/driver");
    }

    getUnavailabilities(licensePlate: string): Observable<Unavailability[]> {
        return this.http.get<Unavailability[]>(this.truckUrl + licensePlate + "/unavailabilities");
    }

    getDrivers(): Observable<Driver[]> {
        return this.http.get<Driver[]>(this.driverUrl);
    }

    getDriver(id: number): Observable<Driver> {
        return this.http.get<Driver>(this.driverUrl + id);
    }
}