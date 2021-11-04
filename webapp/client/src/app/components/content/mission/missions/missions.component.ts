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


  missions: Mission[] | undefined;
  titles = ["#", "date", "loading city", "driver", "truck"]
  sortId = 0;
  whatToSort = (m: Mission) => [m.id, m.loadingTime, m.loadingPoint.address.city, m.driver.firstName + m.driver.lastName, m.truck.licensePlate]


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
          mission => this.setAvailable(mission)
        )
      }
    )
  }

  checkState(state: boolean) {
    if (state) {
      this.router.navigate(['.'], { relativeTo: this.route });
    }
  }

  private setAvailable(mission: Mission) {
    this.transportService.isTruckAvailable(mission.truck.licensePlate, mission.loadingTime.toString()).subscribe(
      result => mission.truckAvailable = result
    )
  }

  orderByColumn(id: number) {
    if (id + 1 != Math.abs(this.sortId)) {
      this.sortId = id + 1;
    }
    this.missions?.sort((m1, m2) => this.sortId * (this.whatToSort(m1)[id] < this.whatToSort(m2)[id] ? 1 : -1));
    this.sortId *= -1;
  }

}
