import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ApiCallsService } from './common/services/ApiCalls/api-calls.service';
import { handleFunction } from './common/services/ApiCalls/functions/handleFunctions';
import { AddItemsComponent } from './components/pages/add-items/add-items.component';
import { ManageItemsComponent } from './components/pages/manage-items/manage-items.component';
import { AllBasketComponent } from './components/pages/all-basket/all-basket.component';
import { RegisterComponent } from './components/pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    AddItemsComponent,
    ManageItemsComponent,
    AllBasketComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
  ],
  providers: [ApiCallsService, handleFunction],
  bootstrap: [AppComponent]
})
export class AppModule { }
