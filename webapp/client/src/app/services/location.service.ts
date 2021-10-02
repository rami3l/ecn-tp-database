import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(private router: Router) {
        this.router.events
            .pipe(filter((event => event instanceof NavigationEnd)))
            .subscribe(() => this.locationChanged());
    }

    private locationChanged() {
        console.log("changement de page");
    }

}