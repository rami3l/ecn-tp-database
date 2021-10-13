import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MissionToSave } from 'src/app/dto/creations/mission-to-save';
import { Driver } from 'src/app/dto/driver';
import { LoadingPoint } from 'src/app/dto/loadingpoint';
import { OrderContent } from 'src/app/dto/ordercontent';
import { SupportedBy } from 'src/app/dto/supportedby';
import { Truck } from 'src/app/dto/truck';
import { OrderService } from 'src/app/services/rest/order.service';
import { PlacesService } from 'src/app/services/rest/places.service';
import { TransportService } from 'src/app/services/rest/transport.service';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.scss']
})
export class MissionFormComponent implements OnInit {

  mission: MissionToSave = new MissionToSave();
  supports: SupportedBy[] = [];
  useDefaultTruck = true;
  modalOpened = false;
  displayedOrderContents: OrderContent[] = [];
  orderContentToAdd: OrderContent[] = [];

  loadingPoints: LoadingPoint[] = [];
  drivers: Driver[] = [];
  trucks: Truck[] = [];
  orderContents: OrderContent[] = [];

  missionForm = new FormGroup({
    loadingDate: new FormControl(new Date(), Validators.required),
    loadingTime: new FormControl(new Date(), Validators.required),
    loadingPoint: new FormControl('', Validators.required),
    driver: new FormControl('', Validators.required),
    truck: new FormControl({ value: '', disabled: true }),
    supports: new FormControl(''),
  });

  constructor(private placesService: PlacesService,
    private transportService: TransportService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.placesService.getLoadingPoints().subscribe(
      loadingPointsReceived => { this.loadingPoints = loadingPointsReceived; }
    )
    this.transportService.getDrivers().subscribe(
      driversReceived => { this.drivers = driversReceived; }
    )
    this.transportService.getTrucks().subscribe(
      trucksReceived => { this.trucks = trucksReceived; }
    )
    this.orderService.getOrderContentsDetailed().subscribe(
      orderContentsReceived => {
        this.orderContents = orderContentsReceived;
        this.displayedOrderContents = orderContentsReceived;
      }
    )
  }

  onSubmit(): void {
    console.log(this.missionForm.value);
  }

  onDriverChange(): void {
    if (this.useDefaultTruck) {
      var driverId = parseInt(this.missionForm.controls.driver.value);
      var driverSelected = this.drivers.filter(driver => (driver.id == driverId))[0];
      this.missionForm.controls.truck.setValue(driverSelected ? driverSelected.defaultTruck.licensePlate : "");
    }
  }

  toggleUseDefaultTruck() {
    this.useDefaultTruck = !this.useDefaultTruck;
    if (this.useDefaultTruck) {
      this.missionForm.controls["truck"].disable();
    } else {
      this.missionForm.controls["truck"].enable();
    }
  }

  addOrderContent(orderContent: OrderContent) {
    this.orderContents = this.orderContents.filter(o => o !== orderContent);
    this.displayedOrderContents = this.displayedOrderContents.filter(o => o !== orderContent);
    this.orderContentToAdd.push(orderContent);
  }

}
