import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonImg } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FechaPipe } from '../pipes/fecha.pipe';
import { Aviso } from '../services/avisos.service';

@Component({
  selector: 'app-aviso-item',
  standalone: true,
  template: `
  <ion-card>
    <ion-img *ngIf="aviso.imagen" [src]="aviso.imagen"></ion-img>
    <ion-card-header>
      <ion-card-title>{{ aviso.titulo }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>{{ aviso.descripcion }}</p>
      <small>{{ aviso.fecha | fecha }}</small>
    </ion-card-content>
    <ion-button color="danger" expand="full" (click)="borrar.emit(aviso.id)">Borrar</ion-button>
  </ion-card>
  `,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonImg, FechaPipe]
})
export class AvisoItemComponent {
  @Input() aviso!: Aviso;
  @Output() borrar = new EventEmitter<number>();
}
