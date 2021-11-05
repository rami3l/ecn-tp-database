import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mission } from 'src/app/dto/mission';
import { MissionService } from 'src/app/services/rest/mission.service';
import { TransportService } from 'src/app/services/rest/transport.service';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  MISSION_OK = Mission.OK;
  MISSION_KO = Mission.KO;
  MISSION_BEGUN = Mission.BEGUN;
  MISSION_NOT_BEGUN = Mission.NOT_BEGUN;

  missions: Mission[] | undefined;

  titles = ["#", "date", "loading city", "driver", "truck"]
  sortId = 0;
  whatToSort = (x: Mission) => [x.id, x.loadingTime, x.loadingPoint.address.city, x.driver.firstName + x.driver.lastName, x.truck.licensePlate]

  sortByColumn(id: number) {
    if (id + 1 != Math.abs(this.sortId)) {
      this.sortId = id + 1;
    }
    this.missions?.sort((x1, x2) => this.sortId * (this.whatToSort(x1)[id] < this.whatToSort(x2)[id] ? 1 : -1));
    this.sortId *= -1;
  }


  constructor(private missionService: MissionService,
    private transportService: TransportService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log("init missions");
    this.missionService.getMissions().subscribe(
      missionsReceived => {
        this.missions = missionsReceived;
        this.missions.forEach(
          mission => this.setAvailableAndState(mission)
        );
      }
    )
  }

  checkState(state: boolean) {
    if (state) {
      this.router.navigate(['.'], { relativeTo: this.route });
    }
  }

  private setAvailableAndState(mission: Mission) {
    this.transportService.isTruckAvailable(mission.truck.licensePlate, mission.loadingTime.toString()).subscribe(
      result => mission.truckAvailable = result
    )
    this.missionService.getMissionState(mission.id).subscribe(
      result => mission.status = result
    )
  }

}
