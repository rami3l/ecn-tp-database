import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionsComponent } from './components/content/mission/missions/missions.component';
import { OrdersComponent } from './components/content/order/orders/orders.component';
import { StockComponent } from './components/content/stock/stock.component';
import { WelcomeComponent } from './components/content/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },

  { path: 'missions', component: MissionsComponent },

  { path: 'orders', component: OrdersComponent },

  { path: 'stock', component: StockComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
