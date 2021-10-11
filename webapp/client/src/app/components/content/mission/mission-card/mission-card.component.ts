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

  id: number = -1;
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

  loadMission(id: number) {
    console.log("chargement de la mission " + id);
    if (isNaN(id)) {
      //TODO: exception si isNaN
      this.mission = undefined;
    } else {
      this.id = id;
      if (id != -1) {
        this.missionService.getMission(id).subscribe(
          missionReceived => { this.mission = missionReceived; }
        )
        this.missionService.getSupports(id).subscribe(
          supportsReceived => {
            this.supports = supportsReceived;
            this.supports.forEach(support => {
              this.orderService.getOrderContentDetailed(support.orderContentId).subscribe(
                orderContentReceived => { support.orderContent = orderContentReceived; }
              )
            })
          }
        )
      }
    }
  }

}
