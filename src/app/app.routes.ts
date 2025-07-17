import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/avisos/avisos.page').then(m => m.AvisosPage)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./pages/crear-aviso/crear-aviso.page').then(m => m.CrearAvisoPage)
  }
];
