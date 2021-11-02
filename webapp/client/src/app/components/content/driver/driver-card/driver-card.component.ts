import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Driver } from 'src/app/dto/driver';
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
        driverReceived.certifications.forEach(
          certification => this.transportService.getTruckType(certification.truckTypeId).subscribe(
            truckTypeReceived => this.certifications.push(truckTypeReceived.name)
          )
        )
      }
    )
  }

}
