import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { UnavailabilityToSave } from 'src/app/dto/creations/unavailability-to-save';
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
  modalOpened = false;
  modalSubscription: Subscription | undefined;
  startDate: string = "";
  endDate: string = "";
  comment: string = "";

  constructor(private activatedRoute: ActivatedRoute,
    private transportService: TransportService) { }

  ngOnInit(): void {
    this.truckChangeSubscription = this.activatedRoute.params.subscribe(
      param => this.loadTruck(param.id)
    )
  }

  ngOnDestroy(): void {
    this.truckChangeSubscription?.unsubscribe();
    this.modalSubscription?.unsubscribe();
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

  modalOpen() {
    this.startDate = "";
    this.endDate = "";
    this.comment = "";
    this.modalOpened = true;
    this.modalSubscription = fromEvent(window, 'keydown').subscribe(
      (event) => {
        if ((event as KeyboardEvent).key == "Escape") { this.modalClose(); }
      }
    );
  }

  modalClose() {
    this.modalSubscription?.unsubscribe();
    this.modalOpened = false;
  }

  createUnavailability() {
    if (this.truck) {
      var newUnavailability = new UnavailabilityToSave(this.startDate, this.endDate, this.comment);
      this.transportService.addUnavailabiliy(this.truck.licensePlate, newUnavailability).subscribe(id =>
        this.transportService.getUnavailability(this.truck ? this.truck.licensePlate : "", id).subscribe(
          unavailabilityReceived => this.unavailabilities.push(unavailabilityReceived)
        )
      )
    }
    this.modalClose();
  }

  deleteUnavailability(unavailability: Unavailability) {
    this.transportService.removeUnavailability(unavailability.id);
    this.unavailabilities = this.unavailabilities.filter(u => u.id != unavailability.id);
  }

}
