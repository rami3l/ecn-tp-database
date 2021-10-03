import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mission } from 'src/app/dto/mission';
import { MissionService } from 'src/app/services/rest/mission.service';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.scss']
})
export class MissionCardComponent implements OnInit, OnChanges {

  id: number = -1;

  mission: Mission | undefined;

  constructor(private activatedRoute: ActivatedRoute,
    private missionService: MissionService) { }

  ngOnInit(): void {
    var string_id = this.activatedRoute.snapshot.paramMap.get('id');
    var id = string_id ? +string_id : NaN;
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

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

}
