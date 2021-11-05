import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/dto/driver';
import { TransportService } from 'src/app/services/rest/transport.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  drivers?: Driver[];

  constructor(private transportService: TransportService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.transportService.getDrivers().subscribe(
      driversReceived => this.drivers = driversReceived
    )
  }

  checkState(state: boolean) {
    if (state) {
      this.router.navigate(['.'], { relativeTo: this.route });
    }
  }

}
