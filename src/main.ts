import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { SqliteService } from './app/services/sqlite.service';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

const sqliteService = new SqliteService();

sqliteService.initWebPlugin().then(() => {
  bootstrapApplication(AppComponent, {
    providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      provideIonicAngular(),
      provideRouter(routes, withPreloading(PreloadAllModules)),
    ],
  });
});
