import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SupportedByToSave } from 'src/app/dto/creations/supportedby-to-save';
import { Mission } from 'src/app/dto/mission';
import { SupportedBy } from 'src/app/dto/supportedby';
import { MissionService } from 'src/app/services/rest/mission.service';
import { OrderService } from 'src/app/services/rest/order.service';
import { TransportService } from 'src/app/services/rest/transport.service';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.scss']
})
export class MissionCardComponent implements OnInit, OnDestroy {

  mission: Mission | undefined;
  supports: SupportedBy[] = [];
  missionChangeSubscription: Subscription | undefined;

  titles = ["client", "time", "address", "product", "quantity"]
  sortId = 0;
  whatToSort = (x: SupportedBy) => [x.orderContent.order.client.abbrev, x.plannedDeliveryTime, x.orderContent.deliveryPoint.address.addressLine, x.orderContent.product.name, x.orderContent.quantity];

  sortByColumn(id: number) {
    if (id + 1 != Math.abs(this.sortId)) {
      this.sortId = id + 1;
    }
    this.supports.sort((x1, x2) => this.sortId * (this.whatToSort(x1)[id] < this.whatToSort(x2)[id] ? 1 : -1));
    this.sortId *= -1;
  }


  constructor(private activatedRoute: ActivatedRoute,
    private missionService: MissionService,
    private orderService: OrderService,
    private transportService: TransportService,
    private router: Router) { }

  ngOnInit(): void {
    this.missionChangeSubscription = this.activatedRoute.params.subscribe(
      param => this.loadMission(param.id)
    );
  }

  ngOnDestroy(): void {
    this.missionChangeSubscription?.unsubscribe();
  }

  private loadMission(id: number) {
    console.log("chargement de la mission " + id);
    if (isNaN(id)) {
      //TODO: exception si isNaN
      this.mission = undefined;
    } else {
      this.missionService.getMission(id).subscribe(
        missionReceived => {
          this.mission = missionReceived;
          this.setAvailable(this.mission);
        }
      );
      this.loadSupports(id);
    }
  }

  private loadSupports(id: number) {
    this.missionService.getSupports(id).subscribe(
      supportsReceived => {
        this.loadOrderContents(supportsReceived);
      }
    );
  }

  private loadOrderContents(supportsReceived: SupportedBy[]) {
    this.supports = [];
    supportsReceived.forEach(support => {
      this.orderService.getOrderContent(support.orderContentId).subscribe(
        orderContentReceived => {
          support.orderContent = orderContentReceived;
          this.supports.push(support);
        }
      )
    })
  }

  private setAvailable(mission: Mission) {
    this.transportService.isTruckAvailable(mission.truck.licensePlate, mission.loadingTime.toString()).subscribe(
      result => mission.truckAvailable = result
    )
  }

  displayDateTime(datetime: Date, datetimeRef: Date): string {
    var display = formatDate(datetime, "HH'h'mm", 'en');
    var date = formatDate(datetime, 'd MMMM y', 'en');
    var dateRef = formatDate(datetimeRef, 'd MMMM y', 'en');
    if (date != dateRef) {
      display = date + "\n" + display;
    }
    return display;
  }

  signOrderContent(supportToSign: SupportedBy, delivered: boolean, signatureTime: string | undefined = undefined) {
    if (this.mission) {
      if (supportToSign.delivered == delivered && supportToSign.signatureTime) {
        signatureTime = "";
      } else {
        if (signatureTime == undefined) {
          signatureTime = new Date().toISOString();
        }
      }
      var newSupport = new SupportedByToSave(supportToSign.plannedDeliveryTime.toString(), supportToSign.orderContentId, this.mission.id, delivered, signatureTime);
      console.log(newSupport);
      this.missionService.postSupportedBy(newSupport).subscribe(
        () => this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(["/missions/mission/" + this.mission?.id]))
      );
    }
  }

}
