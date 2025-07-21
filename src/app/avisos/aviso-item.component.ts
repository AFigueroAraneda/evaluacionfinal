import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonItem, IonLabel, IonButton, IonImg } from '@ionic/angular/standalone';
import { Aviso } from '../services/avisos.service';

@Component({
  selector: 'app-aviso-item',
  standalone: true,
  templateUrl: './aviso-item.component.html',
  styleUrls: ['./aviso-item.component.scss'],
  imports: [CommonModule, IonItem, IonLabel, IonButton, IonImg],
})
export class AvisoItemComponent {
  @Input() aviso!: Aviso;
  @Output() eliminar = new EventEmitter<void>();
}
