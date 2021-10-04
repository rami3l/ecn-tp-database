import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mission } from 'src/app/dto/mission';
import { MissionService } from 'src/app/services/rest/mission.service';
import { MissionCardComponent } from '../mission-card/mission-card.component';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  @ViewChild(MissionCardComponent) child: MissionCardComponent | undefined;

  missions: Mission[] | undefined;

  currentMissionId: number = -1;

  constructor(private missionService: MissionService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("init missions");
    this.missionService.getMissions().subscribe(
      missionsReceived => {
        this.missions = missionsReceived;
      }
    )
  }

  displayMission(id: number) {
    this.currentMissionId = this.currentMissionId == id ? -1 : id;
    if (this.currentMissionId >= 0) {
      this.router.navigate(['mission/', this.currentMissionId], { relativeTo: this.route });
    } else {
      this.router.navigate(['.'], { relativeTo: this.route });
      if (this.child != null) {
        //this.child.destroy();
      }
    }
  }

}
