import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

/**
 * Página inicial de la aplicación. Se muestra al abrir la app y actúa como
 * punto de entrada a las distintas funcionalidades.
 */

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  /**
   * Constructor vacío ya que por ahora la página no requiere dependencias.
   * Se deja definido para facilitar futuras ampliaciones.
   */
  constructor() {}
}
