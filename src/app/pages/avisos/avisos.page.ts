import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonModal } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AvisosService, Aviso } from '../../services/avisos.service';
import { AvisoItemComponent } from '../../components/aviso-item.component';

@Component({
  selector: 'app-avisos',
  standalone: true,
  templateUrl: './avisos.page.html',
  styleUrls: ['./avisos.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonList, IonModal, AvisoItemComponent]
})
export class AvisosPage {
  avisos: Aviso[] = [];
  avisoAEliminar?: Aviso;

  constructor(private router: Router, private avisosService: AvisosService) {}

  ionViewWillEnter() {
    this.cargarAvisos();
  }

  async cargarAvisos() {
    this.avisos = await this.avisosService.getAvisos();
  }

  nuevoAviso() {
    this.router.navigateByUrl('/nuevo');
  }

  confirmarBorrar(aviso: Aviso) {
    this.avisoAEliminar = aviso;
    const modal = document.querySelector('ion-modal');
    if (modal) {
      (modal as HTMLIonModalElement).present();
    }
  }

  async borrarAviso() {
    if (this.avisoAEliminar) {
      await this.avisosService.deleteAviso(this.avisoAEliminar.id!);
      this.avisoAEliminar = undefined;
      const modal = document.querySelector('ion-modal');
      if (modal) {
        (modal as HTMLIonModalElement).dismiss();
      }
      this.cargarAvisos();
    }
  }
}
