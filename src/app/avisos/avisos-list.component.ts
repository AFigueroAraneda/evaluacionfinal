import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFab, IonFabButton, IonIcon, IonModal, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AvisosService, Aviso } from '../services/avisos.service';
import { AvisoItemComponent } from './aviso-item.component';

/**
 * Componente encargado de mostrar la lista de avisos almacenados.
 * Gestiona las operaciones de carga y borrado de avisos mediante un modal
 * de confirmación.
 */

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
  /** Lista de avisos recuperados del servicio. */
  avisos: Aviso[] = [];
  /** Aviso seleccionado para ser eliminado. */
  avisoAEliminar: Aviso | null = null;
  /** Controla la visibilidad del modal de confirmación. */
  isDeleteModalOpen = false;
  /** Último evento emitido por el modal (solo informativo). */
  modalEvent = '';

  constructor(private avisosService: AvisosService, private router: Router) {}

  /**
   * Carga los avisos al inicializar el componente.
   */
  async ngOnInit() {
    await this.cargar();
  }

  /**
   * Vuelve a cargar los avisos cada vez que la vista se presenta.
   */
  async ionViewWillEnter() {
    await this.cargar();
  }

  /** Obtiene la lista actualizada de avisos desde el servicio. */
  private async cargar() {
    this.avisos = await this.avisosService.obtenerAvisos();
  }

  /** Abre el modal para confirmar el borrado de un aviso. */
  borrarAviso(aviso: Aviso) {
    this.avisoAEliminar = aviso;
    this.isDeleteModalOpen = true;
  }

  /**
   * Elimina el aviso previamente seleccionado y actualiza la lista.
   */
  async confirmarBorrado() {
    if (this.avisoAEliminar?.id) {
      await this.avisosService.eliminarAviso(this.avisoAEliminar.id);
      await this.cargar();
    }
    this.cerrarModal();
  }

  /** Cierra el modal de confirmación y limpia el aviso seleccionado. */
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

  /** Navega al formulario para crear un nuevo aviso. */
  nuevo() {
    (document.activeElement as HTMLElement | null)?.blur();
    this.router.navigate(['/avisos/nuevo']);
  }
}
