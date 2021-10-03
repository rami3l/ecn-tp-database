import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mission } from 'src/app/dto/mission';
import { MissionService } from 'src/app/services/rest/mission.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  missions: Mission[] | undefined;

  currentMissionId: number = -1;

  constructor(private missionService: MissionService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.missionService.getMissions().subscribe(
      missionsReceived => {
        this.missions = missionsReceived;
      }
    )
  }

  displayMission(id: number) {
    this.currentMissionId = this.currentMissionId == id ? -1 : id;
    this.router.navigate(['mission/', this.currentMissionId], { relativeTo: this.route });
  }

}
