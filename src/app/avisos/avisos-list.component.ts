import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFab, IonFabButton, IonIcon, IonModal, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AvisosService, Aviso } from '../services/avisos.service';
import { AvisoItemComponent } from './aviso-item.component';

@Component({
  selector: 'app-avisos-list',
  templateUrl: './avisos-list.component.html',
  styleUrls: ['./avisos-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonFab,
    IonFabButton,
    IonIcon,
    IonModal,
    IonButton,
    AvisoItemComponent,
  ]
})
export class AvisosListComponent implements OnInit {
  avisos: Aviso[] = [];
  avisoAEliminar: Aviso | null = null;
  isDeleteModalOpen = false;
  modalEvent = '';

  constructor(private avisosService: AvisosService, private router: Router) {}

  async ngOnInit() {
    await this.cargar();
  }

  async ionViewWillEnter() {
    await this.cargar();
  }

  private async cargar() {
    this.avisos = await this.avisosService.obtenerAvisos();
  }

  borrarAviso(aviso: Aviso) {
    this.avisoAEliminar = aviso;
    this.isDeleteModalOpen = true;
  }

  async confirmarBorrado() {
    if (this.avisoAEliminar?.id) {
      await this.avisosService.eliminarAviso(this.avisoAEliminar.id);
      await this.cargar();
    }
    this.cerrarModal();
  }

  cerrarModal() {
    this.isDeleteModalOpen = false;
    this.avisoAEliminar = null;
  }

  onWillPresent() {
    this.modalEvent = 'willPresent';
  }

  onDidPresent() {
    this.modalEvent = 'didPresent';
  }

  onWillDismiss() {
    this.modalEvent = 'willDismiss';
  }

  nuevo() {
    (document.activeElement as HTMLElement | null)?.blur();
    this.router.navigate(['/avisos/nuevo']);
  }
}
