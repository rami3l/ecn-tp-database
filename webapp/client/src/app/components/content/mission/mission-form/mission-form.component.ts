import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MissionToSave } from 'src/app/dto/creations/mission-to-save';
import { SupportedByToSave } from 'src/app/dto/creations/supportedby-to-save';
import { Driver } from 'src/app/dto/driver';
import { LoadingPoint } from 'src/app/dto/loadingpoint';
import { OrderContent } from 'src/app/dto/ordercontent';
import { SupportedBy } from 'src/app/dto/supportedby';
import { Truck } from 'src/app/dto/truck';
import { MissionService } from 'src/app/services/rest/mission.service';
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
    loadingDate: new FormControl('', Validators.required),
    loadingTime: new FormControl('', Validators.required),
    loadingPoint: new FormControl('', Validators.required),
    driver: new FormControl('', Validators.required),
    truck: new FormControl({ value: '', disabled: true }),
  });

  constructor(private placesService: PlacesService,
    private transportService: TransportService,
    private orderService: OrderService,
    private missionService: MissionService) { }

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
    var mission = new MissionToSave();
    mission.loadingTime = this.missionForm.controls.loadingDate.value + " " + this.missionForm.controls.loadingTime.value + ":00";
    mission.loadingPointId = parseInt(this.missionForm.controls.loadingPoint.value);
    mission.driverId = parseInt(this.missionForm.controls.driver.value);
    mission.truckId = this.missionForm.controls.truck.value;

    this.missionService.postMission(mission).subscribe(
      idMissionCreated => { this.createMissionSupport(idMissionCreated); }
    )
  }

  createMissionSupport(missionId: number): void {
    var supports: SupportedByToSave[] = [];
    this.orderContentToAdd.forEach(
      orderContent => {
        var date = this.missionForm.controls.loadingDate.value + " " + this.missionForm.get("deliveryTime_" + orderContent.id)?.value + ":00"
        supports.push(new SupportedByToSave(date, orderContent.id, missionId))
      }
    )
    console.log(supports);
    //TODO: fermer missionform & refresh missions
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
    this.missionForm.addControl("deliveryTime_" + orderContent.id, new FormControl('', Validators.required));
    this.orderContents = this.orderContents.filter(o => o !== orderContent);
    this.displayedOrderContents = this.displayedOrderContents.filter(o => o !== orderContent);
    this.orderContentToAdd.push(orderContent);
  }

  removeOrderContent(orderContent: OrderContent) {
    this.orderContentToAdd = this.orderContentToAdd.filter(o => o !== orderContent);
    this.orderContents.push(orderContent);
    this.displayedOrderContents.push(orderContent);
    this.missionForm.removeControl("deliveryTime_" + orderContent.id);
  }

}
