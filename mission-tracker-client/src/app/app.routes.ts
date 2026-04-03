import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/missions', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login').then(m => m.LoginComponent)
  },
  {
    path: 'satellites',
    canActivate: [authGuard],
    loadComponent: () =>
        import('./features/satellites/satellite-list').then(m => m.SatelliteListComponent)
  },
  {
    path: 'missions',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/missions/mission-list').then(m => m.MissionListComponent)
  }
];