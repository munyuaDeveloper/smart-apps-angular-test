import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((C) => C.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/register/register.component').then((C) => C.RegisterComponent),
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./pages/home/home.component').then((C) => C.HomeComponent),
  },
  {
    path: 'posts/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/post-detail/post-detail.component').then((C) => C.PostDetailComponent),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (C) => C.DashboardComponent
      ),
  },
];
