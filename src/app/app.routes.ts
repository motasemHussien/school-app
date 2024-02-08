import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  // {
  //   path: ' ',

  //   loadChildren: () => import('./auth/auth.route'),
  // },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   loadChildren: () => import('./home/home.route'),
  // },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
];
