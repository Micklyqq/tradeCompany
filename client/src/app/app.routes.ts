import { Routes } from '@angular/router';
import {OfficeListComponent} from "./office-list/office-list.component";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {AuthComponent} from "./auth/auth.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {OfficeDetailsComponent} from "./office-details/office-details.component";
import {RegistrationComponent} from "./registration/registration.component";
import {ProfileComponent} from "./profile/profile.component";
import {SalesComponent} from "./sales/sales.component";
import {ProductComponent} from "./product/product.component";

export const routes: Routes = [
  {path:'',redirectTo:'/offices',pathMatch:'full'},
  {path:'welcome',title:'Добро пожаловать',component:WelcomePageComponent},
  {path:'offices',title:'Офисы',component:OfficeListComponent},
  {path:'offices/:officeId',title:'Офисы',component:OfficeDetailsComponent},
  {path:'auth',title:'Авторизация',component:AuthComponent},
  {path:'registration',title:'Регистрация',component:RegistrationComponent},
  {path:'profile',title:'Профиль',component:ProfileComponent},
  {path:'**',component:PageNotFoundComponent},
];
