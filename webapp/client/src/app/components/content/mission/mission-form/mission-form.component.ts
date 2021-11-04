import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
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
export class MissionFormComponent implements OnInit, OnDestroy {

  useDefaultTruck = true;
  modalOpened = false;
  modalSubscription: Subscription | undefined;
  isTruckAvailable = true;

  /* Order contents à afficher, à afficher après le filtrage, et à ajouter à la nouvelle mission */
  displayedOrderContents: OrderContent[] = [];
  filteredDisplayedOrderContents: OrderContent[] = [];
  orderContentToAdd: OrderContent[] = [];

  /* Filtres pour la recherche des order contents dans la popup de sélection */
  clientFilter: string = "";
  addressFilter: string = "";
  productFilter: string = "";

  /* Liste des éléments que l'on peut ajouter à la mission */
  loadingPoints: LoadingPoint[] = [];
  drivers: Driver[] = [];
  trucks: Truck[] = [];
  orderContents: OrderContent[] = [];

  /* Variables utile pour le mode édition */
  id: number | undefined;
  oldSupports: Map<number, string | null> = new Map();

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
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
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
    if (this.id) {
      this.loadMission(this.id);
    }
  }

  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
  }

  loadMission(id: number): void {
    if (isNaN(id)) {
      //TODO: exception si isNaN
    } else {
      this.useDefaultTruck = false;
      this.missionForm.controls.truck.enable();
      this.missionService.getMission(id).subscribe(
        missionReceived => {
          /* on met à jour les différents champ du formulaire avec les valeurs de la mission existante */
          this.missionForm.controls.driver.setValue(missionReceived.driver.id);
          this.missionForm.controls.loadingPoint.setValue(missionReceived.loadingPoint.id);
          var date = this.datePipe.transform(missionReceived.loadingTime, "yyyy-MM-dd")
          this.missionForm.controls.loadingDate.setValue(date);
          var time = this.datePipe.transform(missionReceived.loadingTime, "HH:mm")
          this.missionForm.controls.loadingTime.setValue(time);
          this.missionForm.controls.truck.setValue(missionReceived.truck?.licensePlate);
        }
      )
      this.missionService.getSupports(id).subscribe(
        supportsReceived => {
          this.loadOldOrderContents(supportsReceived);
        }
      )
    }
  }

  private loadOldOrderContents(supportsReceived: SupportedBy[]) {
    supportsReceived.forEach(support => {
      var date = this.datePipe.transform(support.plannedDeliveryTime, "yyyy-MM-dd HH:mm")
      this.oldSupports.set(support.orderContentId, date);
      this.orderService.getOrderContent(support.orderContentId).subscribe(
        orderContentReceived => {
          this.addOrderContent(orderContentReceived);
          var time = this.datePipe.transform(support.plannedDeliveryTime, "HH:mm");
          this.missionForm.get("deliveryTime_" + orderContentReceived.id)?.setValue(time);
        }
      )
    })
  }

  onSubmit(): void {
    var mission = new MissionToSave();
    mission.loadingTime = this.missionForm.controls.loadingDate.value + " " + this.missionForm.controls.loadingTime.value;
    mission.loadingPointId = parseInt(this.missionForm.controls.loadingPoint.value);
    mission.driverId = parseInt(this.missionForm.controls.driver.value);
    mission.truckId = this.missionForm.controls.truck.value;

    if (this.id == null) {
      this.missionService.postMission(mission).subscribe(
        idMissionCreated => { this.createMissionSupport(idMissionCreated); }
      )
    } else {
      this.missionService.updateMission(mission, this.id).subscribe(
        (id) => console.log("update mission ", id)
      );
      this.updateMissionSupport(this.id);
    }
  }

  private updateMissionSupport(missionId: number): void {
    /* On supprime de la base de donnée tous les orderContents qui ont été retiré de la mission lors de l'édition */
    for (let [orderContentId,] of this.oldSupports) {
      if (this.orderContentToAdd.filter(orderContent => orderContent.id == orderContentId).length == 0) {
        this.missionService.deleteSupportedBy(orderContentId, missionId).subscribe();
        console.log("Suppression de l'order content ", orderContentId);
      }
    }
    /* On ne garde dans orderContentToAdd que les orderContents qui ont été modifiés */
    this.orderContentToAdd = this.orderContentToAdd.filter(orderContent => {
      var oldDate = this.oldSupports.get(orderContent.id);
      var date = this.missionForm.controls.loadingDate.value + " " + this.missionForm.get("deliveryTime_" + orderContent.id)?.value;
      return oldDate != date;
    })
    /* On écrase (update) les orderContents qui ont été modifié */
    this.createMissionSupport(missionId);
  }

  createMissionSupport(missionId: number): void {
    this.orderContentToAdd.forEach(
      orderContent => {
        var date = this.missionForm.controls.loadingDate.value + " " + this.missionForm.get("deliveryTime_" + orderContent.id)?.value;
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

  getTruckAvailable(): void {
    var licensePlate = this.missionForm.controls.truck.value;
    var date = this.missionForm.controls.loadingDate.value;
    if (licensePlate && date) {
      this.transportService.isTruckAvailable(licensePlate, date).subscribe(
        result => this.isTruckAvailable = result
      );
    } else {
      this.isTruckAvailable = true;
    }
  }

}
