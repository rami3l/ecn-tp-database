import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhoneBook } from 'src/app/dto/phonebook';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PhoneBookService {

    url: string = environment.apiUrl + "phonebooks/";

    constructor(private http: HttpClient) { }

    getPhoneBooks(): Observable<PhoneBook[]> {
        return this.http.get<PhoneBook[]>(this.url);
    }

}