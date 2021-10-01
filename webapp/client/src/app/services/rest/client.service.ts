import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/dto/client';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root',
})
export class ClientService {

    private url: string = environment.apiUrl + "clients/";

    constructor(private http: HttpClient) { }

    getClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.url);
    }

    getClient(abbrev: string): Observable<Client> {
        return this.http.get<Client>(this.url + abbrev);
    }
}