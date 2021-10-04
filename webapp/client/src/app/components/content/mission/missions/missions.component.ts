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

  constructor(private missionService: MissionService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log("init missions");
    this.missionService.getMissions().subscribe(
      missionsReceived => {
        this.missions = missionsReceived;
      }
    )
  }

  checkState(state: boolean) {
    if (state) {
      this.router.navigate(['.'], { relativeTo: this.route });
    }
  }

}
