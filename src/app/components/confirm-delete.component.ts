import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonModal, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-confirm-delete',
  template: `
    <ion-modal [(isOpen)]="open">
      <div class="wrapper">
        <p>¿Deseas eliminar la publicación?</p>
        <ion-button expand="full" color="danger" (click)="confirm()">Eliminar</ion-button>
        <ion-button expand="full" (click)="open = false">Cancelar</ion-button>
      </div>
    </ion-modal>
  `,
  standalone: true,
  imports: [CommonModule, IonModal, IonButton],
})
export class ConfirmDeleteComponent {
  open = false;
  private id?: number;
  @Output() confirmed = new EventEmitter<number>();

  ask(id: number) {
    this.id = id;
    this.open = true;
  }

  confirm() {
    if (this.id != null) {
      this.confirmed.emit(this.id);
    }
    this.open = false;
  }
}
