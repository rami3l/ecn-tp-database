import { Component } from '@angular/core';
import { ClientService } from '../services/rest/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  constructor(private clientService: ClientService) {
    clientService.getClients().subscribe(
      clients => console.log("test", clients)
    );
  }
}
