import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissionCardComponent } from './components/content/mission/mission-card/mission-card.component';
import { MissionFormComponent } from './components/content/mission/mission-form/mission-form.component';
import { MissionsComponent } from './components/content/mission/missions/missions.component';
import { OrderCardComponent } from './components/content/order/order-card/order-card.component';
import { OrdersComponent } from './components/content/order/orders/orders.component';
import { ProductsComponent } from './components/content/stock/products/products.component';
import { WelcomeComponent } from './components/content/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },

  {
    path: 'missions', component: MissionsComponent,
    children: [
      { path: 'mission/new', component: MissionFormComponent },
      { path: 'mission/:id', component: MissionCardComponent },
      { path: 'mission/:id/edit', component: MissionFormComponent }
    ]
  },
  { path: 'mission/:id', component: MissionCardComponent },

  {
    path: 'orders', component: OrdersComponent,
    children: [
      { path: 'order/:id', component: OrderCardComponent }
    ]
  },
  { path: 'order/:id', component: OrderCardComponent },

  { path: 'stock', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
