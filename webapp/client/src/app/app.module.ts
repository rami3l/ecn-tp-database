import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { MissionCardComponent } from './components/content/mission/mission-card/mission-card.component';
import { MissionFormComponent } from './components/content/mission/mission-form/mission-form.component';
import { MissionsComponent } from './components/content/mission/missions/missions.component';
import { OrderCardComponent } from './components/content/order/order-card/order-card.component';
import { OrderFormComponent } from './components/content/order/order-form/order-form.component';
import { OrdersComponent } from './components/content/order/orders/orders.component';
import { ProductsComponent } from './components/content/stock/products/products.component';
import { WelcomeComponent } from './components/content/welcome/welcome.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProductCardComponent } from './components/content/stock/product-card/product-card.component';
import { PhonebookComponent } from './components/content/phonebook/phonebook.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    WelcomeComponent,
    MissionsComponent,
    MissionCardComponent,
    MissionFormComponent,
    OrdersComponent,
    OrderCardComponent,
    OrderFormComponent,
    ProductsComponent,
    ProductCardComponent,
    PhonebookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
