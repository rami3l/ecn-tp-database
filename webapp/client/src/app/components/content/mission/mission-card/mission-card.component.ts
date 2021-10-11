import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mission } from 'src/app/dto/mission';
import { SupportedBy } from 'src/app/dto/supportedby';
import { MissionService } from 'src/app/services/rest/mission.service';
import { OrderService } from 'src/app/services/rest/order.service';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.scss']
})
export class MissionCardComponent implements OnInit {

  mission: Mission | undefined;
  supports: SupportedBy[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private missionService: MissionService,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      param => this.loadMission(param.id)
    );
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
    supportsReceived.forEach(support => {
      this.orderService.getOrderContent(support.orderContentId).subscribe(
        orderContentReceived => {
          support.orderContent = orderContentReceived;
          this.supports.push(support);
        }
      )
    })
  }

}
