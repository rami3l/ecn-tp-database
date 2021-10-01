import { Component, OnInit } from '@angular/core';
import { Mission } from 'src/app/dto/mission';
import { MissionService } from 'src/app/services/rest/mission.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  missions: Mission[] | undefined;

  constructor(private missionService: MissionService) { }

  ngOnInit(): void {
    this.missionService.getMissions().subscribe(
      missionsReceived => { this.missions = missionsReceived; }
    )
  }

}
