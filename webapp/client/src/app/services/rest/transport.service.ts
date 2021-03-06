import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnavailabilityToSave } from 'src/app/dto/creations/unavailability-to-save';
import { Driver } from 'src/app/dto/driver';
import { Mission } from 'src/app/dto/mission';
import { Truck } from 'src/app/dto/truck';
import { TruckType } from 'src/app/dto/trucktype';
import { Unavailability } from 'src/app/dto/unavailability';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TransportService {

    truckUrl: string = environment.apiUrl + "trucks/";
    driverUrl: string = environment.apiUrl + "drivers/";
    unavailabilityUrl: string = environment.apiUrl + "unavailabilities/"
    truckTypeUrl: string = environment.apiUrl + "trucktypes/"

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

    getUnavailability(licensePlate: string, unavailabilityId: number): Observable<Unavailability> {
        return this.http.get<Unavailability>(this.truckUrl + licensePlate + "/unavailabilities/" + unavailabilityId);
    }

    addUnavailabiliy(licensePlate: string, unavailability: UnavailabilityToSave): Observable<number> {
        return this.http.post<number>(this.truckUrl + licensePlate + "/unavailabilities", unavailability);
    }

    removeUnavailability(id: number) {
        this.http.delete(this.unavailabilityUrl + id).subscribe();
    }

    getDrivers(): Observable<Driver[]> {
        return this.http.get<Driver[]>(this.driverUrl);
    }

    getDriver(id: number): Observable<Driver> {
        return this.http.get<Driver>(this.driverUrl + id);
    }

    getDriverMissions(driverId: number): Observable<Mission[]> {
        return this.http.get<Mission[]>(this.driverUrl + driverId + "/missions");
    }

    getTruckType(id: number): Observable<TruckType> {
        return this.http.get<TruckType>(this.truckTypeUrl + id);
    }

    isTruckAvailable(licensePlate: string, date: string) {
        return this.http.get<boolean>(this.truckUrl + licensePlate + "/isAvailable/" + date.split("T")[0]);
    }
}