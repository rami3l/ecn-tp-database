import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverCardComponent } from './components/content/driver/driver-card/driver-card.component';
import { DriversComponent } from './components/content/driver/drivers/drivers.component';
import { MissionCardComponent } from './components/content/mission/mission-card/mission-card.component';
import { MissionFormComponent } from './components/content/mission/mission-form/mission-form.component';
import { MissionsComponent } from './components/content/mission/missions/missions.component';
import { OrderCardComponent } from './components/content/order/order-card/order-card.component';
import { OrdersComponent } from './components/content/order/orders/orders.component';
import { PhonebookComponent } from './components/content/phonebook/phonebook.component';
import { ProductCardComponent } from './components/content/stock/product-card/product-card.component';
import { ProductExportComponent } from './components/content/stock/product-export/product-export.component';
import { ProductsComponent } from './components/content/stock/products/products.component';
import { TruckCardComponent } from './components/content/truck/truck-card/truck-card.component';
import { TruckComponent } from './components/content/truck/truck/truck.component';
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
  { path: 'mission/:id/edit', component: MissionFormComponent },

  {
    path: 'orders', component: OrdersComponent,
    children: [
      { path: 'order/:id', component: OrderCardComponent }
    ]
  },
  { path: 'order/:id', component: OrderCardComponent },

  {
    path: 'trucks', component: TruckComponent,
    children: [
      { path: 'truck/:id', component: TruckCardComponent }
    ]
  },
  { path: 'truck/:id', component: TruckCardComponent },

  {
    path: 'drivers', component: DriversComponent,
    children: [
      { path: 'driver/:id', component: DriverCardComponent }
    ]
  },
  { path: 'driver/:id', component: DriverCardComponent },

  {
    path: 'stock', component: ProductsComponent,
    children: [
      { path: 'product/:id', component: ProductCardComponent },
      { path: 'export', component: ProductExportComponent }
    ]
  },
  { path: 'product/:id', component: ProductCardComponent },

  { path: 'phonebooks', component: PhonebookComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
