import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'avisos',
    loadComponent: () => import('./avisos/avisos-list.component').then(m => m.AvisosListComponent)
  },
  {
    path: 'avisos/nuevo',
    loadComponent: () => import('./avisos/aviso-form.component').then(m => m.AvisoFormComponent)
  },
  {
    path: '',
    redirectTo: 'avisos',
    pathMatch: 'full'
  }
];
