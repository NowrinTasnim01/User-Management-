import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { AdminPanel } from './components/admin-panel/admin-panel';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'login',
    component: Login
  },
   {
    path: 'dashboard',
    component: Dashboard
  },
   {
    path: 'admin',
    component: AdminPanel
  }
];
