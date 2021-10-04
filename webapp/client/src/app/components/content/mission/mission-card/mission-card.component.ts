import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mission } from 'src/app/dto/mission';
import { MissionService } from 'src/app/services/rest/mission.service';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.scss']
})
export class MissionCardComponent implements OnInit, OnDestroy {

  id: number = -1;

  mission: Mission | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
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
        this.missionService.getMission(id).subscribe(
          missionReceived => { this.mission = missionReceived; }
        )
      }
    }
  }

  ngOnDestroy() {
    console.log("destruction du mission-card");
  }

}
