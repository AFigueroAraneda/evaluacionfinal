/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';
import { LOCALE_ID } from '@angular/core';

import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { defineCustomElements as jeepDefineCustomElements } from 'jeep-sqlite/loader';
import { defineCustomElements as pwaDefineCustomElements } from '@ionic/pwa-elements/loader';
import { addIcons } from 'ionicons';
import { add as addIcon } from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Registrar el locale de Angular
registerLocaleData(localeEsCl, 'es-CL');

// Bootstrap de la aplicación
bootstrapApplication(AppComponent, {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CL' },

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});

// Definir elementos personalizados de Jeep SQLite y PWA Elements
jeepDefineCustomElements(window);
pwaDefineCustomElements(window);
addIcons({ add: addIcon });
