import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Driver } from 'src/app/dto/driver';
import { Mission } from 'src/app/dto/mission';
import { TransportService } from 'src/app/services/rest/transport.service';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss']
})
export class DriverCardComponent implements OnInit, OnDestroy {

  driver?: Driver;
  driverChangeSubscription?: Subscription;
  certifications: string[] = [];
  missions: Mission[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private transportService: TransportService) { }

  ngOnInit(): void {
    this.driverChangeSubscription = this.activatedRoute.params.subscribe(
      param => this.loadDriver(param.id)
    )
  }

  ngOnDestroy(): void {
    this.driverChangeSubscription?.unsubscribe();
  }

  private loadDriver(id: number) {
    this.certifications = [];
    this.transportService.getDriver(id).subscribe(
      driverReceived => {
        this.driver = driverReceived;
        this.loadCertifications(driverReceived);
        this.loadDriverMissions(driverReceived.id);
      }
    )
  }

  private loadCertifications(driver: Driver) {
    driver.certifications.forEach(
      certification => this.transportService.getTruckType(certification.truckTypeId).subscribe(
        truckTypeReceived => this.certifications.push(truckTypeReceived.name)
      )
    );
  }

  private loadDriverMissions(diverId: number) {
    this.transportService.getDriverMissions(diverId).subscribe(
      missionsReceived => this.missions = missionsReceived
    );
  }

}
