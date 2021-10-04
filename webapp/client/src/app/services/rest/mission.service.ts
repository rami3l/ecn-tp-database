import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MissionWithDetails } from 'src/app/dto/details/missionWithDetails';
import { Mission } from 'src/app/dto/mission';
import { OrderContent } from 'src/app/dto/ordercontent';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MissionService {

    url: string = environment.apiUrl + "missions/";

    constructor(private http: HttpClient) { }

    getMissions(): Observable<Mission[]> {
        return this.http.get<Mission[]>(this.url);
    }

    getMission(id: number): Observable<Mission> {
        return this.http.get<Mission>(this.url + id);
    }

    getMissionWithDetails(id: number): Observable<MissionWithDetails> {
        return new Observable(observer =>
            this.http.get<MissionWithDetails>(this.url + id).subscribe(
                missionWithDetails => {
                    this.getOrderContents(id).subscribe(
                        ordercontents => {
                            missionWithDetails.orderContents = ordercontents;
                            observer.next(missionWithDetails);
                            observer.complete();
                        }
                    )
                }
            )
        );
    }

    getOrderContents(missionId: number): Observable<OrderContent[]> {
        return this.http.get<OrderContent[]>(this.url + missionId + "/ordercontents");
    }

}