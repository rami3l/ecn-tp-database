import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Driver } from 'src/app/dto/driver';
import { Mission } from 'src/app/dto/mission';
import { MissionService } from 'src/app/services/rest/mission.service';
import { TransportService } from 'src/app/services/rest/transport.service';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss']
})
export class DriverCardComponent implements OnInit, OnDestroy {

  MISSION_OK = Mission.OK;
  MISSION_KO = Mission.KO;
  MISSION_BEGUN = Mission.BEGUN;
  MISSION_NOT_BEGUN = Mission.NOT_BEGUN;

  driver?: Driver;
  driverChangeSubscription?: Subscription;
  certifications: string[] = [];
  missions: Mission[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private transportService: TransportService,
    private missionService: MissionService) { }

  ngOnInit(): void {
    this.driverChangeSubscription = this.activatedRoute.params.subscribe(
      param => this.loadDriver(param.id)
    )
  }

  ngOnDestroy(): void {
    this.driverChangeSubscription?.unsubscribe();
  }

  private loadDriver(id: number) {
    this.certifications = [];
    this.transportService.getDriver(id).subscribe(
      driverReceived => {
        this.driver = driverReceived;
        this.loadCertifications(driverReceived);
        this.loadDriverMissions(driverReceived.id);
      }
    )
  }

  private loadCertifications(driver: Driver) {
    driver.certifications.forEach(
      certification => this.transportService.getTruckType(certification.truckTypeId).subscribe(
        truckTypeReceived => this.certifications.push(truckTypeReceived.name)
      )
    );
  }

  private loadDriverMissions(diverId: number) {
    this.transportService.getDriverMissions(diverId).subscribe(
      missionsReceived => {
        this.missions = missionsReceived;
        this.missions.forEach(
          (mission) => this.setAvailableAndState(mission)
        );
      }
    );
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
