import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Truck } from 'src/app/dto/truck';
import { Unavailability } from 'src/app/dto/unavailability';
import { TransportService } from 'src/app/services/rest/transport.service';

@Component({
  selector: 'app-truck-card',
  templateUrl: './truck-card.component.html',
  styleUrls: ['./truck-card.component.scss']
})
export class TruckCardComponent implements OnInit, OnDestroy {

  truck: Truck | undefined;
  unavailabilities: Unavailability[] = [];
  truckChangeSubscription: Subscription | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private transportService: TransportService) { }

  ngOnInit(): void {
    this.truckChangeSubscription = this.activatedRoute.params.subscribe(
      param => this.loadTruck(param.id)
    )
  }

  ngOnDestroy(): void {
    this.truckChangeSubscription?.unsubscribe();
  }

  private loadTruck(licensePlate: string) {
    this.transportService.getTruck(licensePlate).subscribe(
      truckReceived => {
        this.transportService.getAssignedDriver(licensePlate).subscribe(
          driverReceived => truckReceived.assignedDriver = driverReceived
        )
        this.transportService.getUnavailabilities(licensePlate).subscribe(
          unavailabilitiesReceived => {
            this.unavailabilities = unavailabilitiesReceived;
            this.truck = truckReceived;
          }
        )
      }
    );
  }

}
