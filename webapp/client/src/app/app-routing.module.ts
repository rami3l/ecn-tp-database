import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionCardComponent } from './components/content/mission/mission-card/mission-card.component';
import { MissionsComponent } from './components/content/mission/missions/missions.component';
import { OrderCardComponent } from './components/content/order/order-card/order-card.component';
import { OrdersComponent } from './components/content/order/orders/orders.component';
import { StockComponent } from './components/content/stock/stock.component';
import { WelcomeComponent } from './components/content/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },

  { path: 'mission/list', component: MissionsComponent },
  { path: 'mission/see/:id', component: MissionCardComponent },

  { path: 'order/list', component: OrdersComponent },
  { path: 'order/see/:id', component: OrderCardComponent },

  { path: 'stock', component: StockComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
