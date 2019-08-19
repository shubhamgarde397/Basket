import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { AddItemsComponent } from './components/pages/add-items/add-items.component';
import { ManageItemsComponent } from './components/pages/manage-items/manage-items.component';
import { AllBasketComponent } from './components/pages/all-basket/all-basket.component';
import { RegisterComponent } from './components/pages/register/register.component';


const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'REGISTER', component: RegisterComponent },
  { path: 'Home', component: HomePageComponent },
  { path: 'Home/ADD_ITEMS', component: AddItemsComponent },
  { path: 'Home/MANAGE_ITEMS', component: ManageItemsComponent },
  { path: 'Home/ALL_ITEMS', component: AllBasketComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
