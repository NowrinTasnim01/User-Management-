import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { AdminPanel } from './components/admin-panel/admin-panel';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
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
    component: Dashboard,
    canActivate: [AuthGuard]
  },
   {
    path: 'admin',
    component: AdminPanel,
    canActivate: [AuthGuard, AdminGuard]
  }
];
