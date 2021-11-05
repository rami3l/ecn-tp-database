import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Truck } from 'src/app/dto/truck';
import { TransportService } from 'src/app/services/rest/transport.service';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.scss']
})
export class TruckComponent implements OnInit {

  trucks: Truck[] | undefined;

  constructor(private transportService: TransportService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.transportService.getTrucks().subscribe(
      trucksReceived => this.loadTrucks(trucksReceived)
    )
  }

  private loadTrucks(trucks: Truck[]) {
    this.trucks = trucks;
    trucks.forEach(
      truck => this.transportService.getAssignedDriver(truck.licensePlate).subscribe(
        driverReceived => truck.assignedDriver = driverReceived
      )
    )
  }

  checkState(state: boolean) {
    if (state) {
      this.router.navigate(['.'], { relativeTo: this.route });
    }
  }

}
