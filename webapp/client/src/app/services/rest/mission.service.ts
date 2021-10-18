import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MissionToSave } from 'src/app/dto/creations/mission-to-save';
import { SupportedByToSave } from 'src/app/dto/creations/supportedby-to-save';
import { Mission } from 'src/app/dto/mission';
import { SupportedBy } from 'src/app/dto/supportedby';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MissionService {

    url: string = environment.apiUrl + "missions/";
    supportedByUrl: string = environment.apiUrl + "supportedby/";

    constructor(private http: HttpClient) { }

    getMissions(): Observable<Mission[]> {
        return this.http.get<Mission[]>(this.url);
    }

    getMission(id: number): Observable<Mission> {
        return this.http.get<Mission>(this.url + id);
    }

    getSupports(missionId: number): Observable<SupportedBy[]> {
        return this.http.get<SupportedBy[]>(this.url + missionId + "/supports");
    }

    postMission(mission: MissionToSave): Observable<number> {
        return this.http.post<number>(this.url, mission);
    }

    postSupportedBy(support: SupportedByToSave): Observable<void> {
        return this.http.post<void>(this.supportedByUrl, support);
    }

    updateMission(mission: MissionToSave, id: number): Observable<number> {
        return this.http.put<number>(this.url + id, mission);
    }

    deleteSupportedBy(orderContentId: number, missionId: number): Observable<void> {
        return this.http.delete<void>(this.supportedByUrl + orderContentId + "/" + missionId);
    }

}