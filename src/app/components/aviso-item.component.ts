import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonItem, IonLabel, IonImg, IonButton } from '@ionic/angular/standalone';
import { Aviso } from '../models/aviso';
import { FechaPipe } from '../pipes/fecha.pipe';

@Component({
  selector: 'app-aviso-item',
  template: `
    <ion-item>
      <ion-label class="ion-text-wrap">
        <h2>{{ aviso.titulo }}</h2>
        <p>{{ aviso.descripcion }}</p>
        <p>{{ aviso.fecha | fecha }}</p>
      </ion-label>
      <ion-img *ngIf="aviso.imagen" [src]="aviso.imagen" slot="start"></ion-img>
      <ion-button fill="clear" color="danger" slot="end" (click)="borrar()">Eliminar</ion-button>
    </ion-item>
  `,
  standalone: true,
  imports: [CommonModule, IonItem, IonLabel, IonImg, IonButton, FechaPipe],
})
export class AvisoItemComponent {
  @Input() aviso!: Aviso;
  @Output() delete = new EventEmitter<number>();

  borrar() {
    if (this.aviso.id) {
      this.delete.emit(this.aviso.id);
    }
  }
}
