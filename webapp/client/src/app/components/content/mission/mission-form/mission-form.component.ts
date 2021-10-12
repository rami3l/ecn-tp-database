import { Component, OnInit } from '@angular/core';
import { MissionToSave } from 'src/app/dto/creations/mission-to-save';
import { LoadingPoint } from 'src/app/dto/loadingpoint';
import { SupportedBy } from 'src/app/dto/supportedby';
import { PlacesService } from 'src/app/services/rest/places.service';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.scss']
})
export class MissionFormComponent implements OnInit {

  mission: MissionToSave = new MissionToSave();
  supports: SupportedBy[] = [];
  loadingPoints: LoadingPoint[] = [];

  constructor(private placesService: PlacesService) { }

  ngOnInit(): void {
    this.placesService.getLoadingPoints().subscribe(
      loadingPointsReceived => { this.loadingPoints = loadingPointsReceived; }
    )
  }



}
