import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mission } from 'src/app/dto/mission';
import { SupportedBy } from 'src/app/dto/supportedby';
import { MissionService } from 'src/app/services/rest/mission.service';
import { OrderService } from 'src/app/services/rest/order.service';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.scss']
})
export class MissionCardComponent implements OnInit, OnDestroy {

  mission: Mission | undefined;
  supports: SupportedBy[] = [];
  missionChangeSubscription: Subscription | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private missionService: MissionService,
    private orderService: OrderService) { }

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
        missionReceived => { this.mission = missionReceived; }
      )
      this.missionService.getSupports(id).subscribe(
        supportsReceived => {
          this.loadOrderContents(supportsReceived);
        }
      )
    }
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

  displayDateTime(datetime: Date, datetimeRef: Date): string {
    var display = formatDate(datetime, "HH'h'mm", 'en');
    var date = formatDate(datetime, 'd MMMM y', 'en');
    var dateRef = formatDate(datetimeRef, 'd MMMM y', 'en');
    if (date != dateRef) {
      display = date + "\n" + display;
    }
    return display;
  }

}
