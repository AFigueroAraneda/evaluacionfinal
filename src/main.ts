import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { defineCustomElements as jeepDefineCustomElements } from 'jeep-sqlite/loader';
import { defineCustomElements as pwaDefineCustomElements } from '@ionic/pwa-elements/loader';
import { addIcons } from 'ionicons';
import { add as addIcon } from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

jeepDefineCustomElements(window);
pwaDefineCustomElements(window);
addIcons({ add: addIcon });

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
