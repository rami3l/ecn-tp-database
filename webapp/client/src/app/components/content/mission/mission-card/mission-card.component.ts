import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MissionWithDetails } from 'src/app/dto/details/missionWithDetails';
import { MissionService } from 'src/app/services/rest/mission.service';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.scss']
})
export class MissionCardComponent implements OnInit {

  id: number = -1;
  mission: MissionWithDetails | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private missionService: MissionService) { }

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
        this.missionService.getMissionWithDetails(id).subscribe(
          missionReceived => { this.mission = missionReceived; }
        )
      }
    }
  }

}
