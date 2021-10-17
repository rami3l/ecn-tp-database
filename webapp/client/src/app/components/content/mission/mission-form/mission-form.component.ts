import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { MissionToSave } from 'src/app/dto/creations/mission-to-save';
import { SupportedByToSave } from 'src/app/dto/creations/supportedby-to-save';
import { Driver } from 'src/app/dto/driver';
import { LoadingPoint } from 'src/app/dto/loadingpoint';
import { OrderContent } from 'src/app/dto/ordercontent';
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
export class MissionFormComponent implements OnInit, OnDestroy {

  useDefaultTruck = true;
  modalOpened = false;
  modalSubscription: Subscription | undefined;
  displayedOrderContents: OrderContent[] = [];
  filteredDisplayedOrderContents: OrderContent[] = [];
  orderContentToAdd: OrderContent[] = [];
  clientFilter: string = "";
  addressFilter: string = "";
  productFilter: string = "";

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
    private missionService: MissionService,
    private router: Router) { }

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
    this.orderService.getOrderContentsUnsupportedDetailed().subscribe(
      orderContentsReceived => {
        this.orderContents = orderContentsReceived;
        this.displayedOrderContents = orderContentsReceived;
        this.filteredDisplayedOrderContents = orderContentsReceived;
      }
    )
  }

  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
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
    this.orderContentToAdd.forEach(
      orderContent => {
        var date = this.missionForm.controls.loadingDate.value + " " + this.missionForm.get("deliveryTime_" + orderContent.id)?.value + ":00"
        this.missionService.postSupportedBy(new SupportedByToSave(date, orderContent.id, missionId)).subscribe(
          () => { console.log("saving mission support"); }
        );
      }
    )
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(["/missions"]));
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
      this.onDriverChange();
    } else {
      this.missionForm.controls["truck"].enable();
    }
  }

  addOrderContent(orderContent: OrderContent) {
    this.missionForm.addControl("deliveryTime_" + orderContent.id, new FormControl('', Validators.required));
    this.orderContents = this.orderContents.filter(o => o !== orderContent);
    this.displayedOrderContents = this.displayedOrderContents.filter(o => o !== orderContent);
    this.orderContentToAdd.push(orderContent);
    this.refreshFilter();
  }

  removeOrderContent(orderContent: OrderContent) {
    this.orderContentToAdd = this.orderContentToAdd.filter(o => o !== orderContent);
    this.orderContents.push(orderContent);
    this.displayedOrderContents.push(orderContent);
    this.missionForm.removeControl("deliveryTime_" + orderContent.id);
  }

  modalOpen() {
    this.resetFilters();
    this.modalOpened = true;
    this.modalSubscription = fromEvent(window, 'keydown').subscribe(
      (event) => {
        if ((event as KeyboardEvent).key == "Escape") {
          (this.clientFilter + this.addressFilter + this.productFilter) == "" ? this.modalClose() : this.resetFilters();
        }
      }
    );
  }

  modalClose() {
    this.modalSubscription?.unsubscribe();
    this.modalOpened = false;
  }

  refreshFilter() {
    this.filteredDisplayedOrderContents = this.displayedOrderContents.filter(
      orderContent =>
        orderContent.order.client.abbrev.toLowerCase().includes(this.clientFilter.toLowerCase()) &&
        (orderContent.deliveryPoint.address.addressLine + " " + orderContent.deliveryPoint.address.city).toLowerCase().includes(this.addressFilter.toLowerCase()) &&
        orderContent.product.name.toLowerCase().includes(this.productFilter.toLowerCase())
    );
  }

  resetFilters() {
    this.clientFilter = "";
    this.addressFilter = "";
    this.productFilter = "";
    this.refreshFilter();
  }

}
