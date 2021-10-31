import { Component, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Scheduling } from 'src/app/dto/scheduling';
import { StockService } from 'src/app/services/rest/stock.service';

@Component({
  selector: 'app-product-export',
  templateUrl: './product-export.component.html',
  styleUrls: ['./product-export.component.scss']
})
export class ProductExportComponent implements OnInit {

  schedulings: Scheduling[] | undefined;
  email: string = "";
  sch_email: string = "";
  sch_cron: string = "";
  sendingEmail = false;
  modalOpened = false;
  modalSubscription: Subscription | undefined;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getScheduleSendings().subscribe(
      schedulingsReceived => this.schedulings = schedulingsReceived
    )
  }

  sendListing() {
    this.sendingEmail = true;
    this.stockService.sendListingTo(this.email).subscribe(
      () => {
        this.sendingEmail = false;
        this.email = "";
      }
    )
  }

  scheduleSending() {
    this.stockService.scheduleSendingTo(this.sch_email, this.sch_cron).subscribe(
      idTaskCreated => {
        if (idTaskCreated != -1) {
          this.schedulings?.push(new Scheduling(idTaskCreated, this.sch_cron, this.sch_email))
        }
      }
    );
    this.modalClose();
  }

  cancelScheduling(id: number) {
    // cancel the sc  heduling...
    this.stockService.cancelScheduleSending(id);
    // ... and remove it from local scheduling list
    this.schedulings = this.schedulings?.filter(scheduling => scheduling.id != id);
  }

  modalOpen() {
    this.sch_cron = "";
    this.sch_email = "";
    this.modalOpened = true;
    this.modalSubscription = fromEvent(window, 'keydown').subscribe(
      (event) => {
        if ((event as KeyboardEvent).key == "Escape") {
          this.modalClose();
        }
      }
    );
  }

  modalClose() {
    this.modalSubscription?.unsubscribe();
    this.modalOpened = false;
  }

}
