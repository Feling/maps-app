import { Routes } from '@angular/router';
import {LayoutComponent} from "./containers/layout/layout.component";
import {LoginComponent} from "./containers/login/login.component";
import {HomeComponent} from "./containers/home/home.component";
import {AuthGuardService} from "./services/auth-guard.service";



export const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'home'
},
  {
  path: '',
  component: LayoutComponent,
  children: [{
    path: 'login',
    component: LoginComponent
  }, {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  }]
}, {
  path: '**',
    redirectTo: 'home'
  }];
