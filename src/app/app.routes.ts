import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'avisos',
    loadComponent: () =>
      import(
        /* @vite-ignore */
        './avisos/avisos-list.component'
      ).then((m) => m.AvisosListComponent),
  },
  {
    path: 'avisos/nuevo',
    loadComponent: () =>
      import(
        /* @vite-ignore */
        './avisos/aviso-form.component'
      ).then((m) => m.AvisoFormComponent),
  },
  {
    path: '',
    redirectTo: 'avisos',
    pathMatch: 'full'
  }
];
