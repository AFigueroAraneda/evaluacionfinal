import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonItem, IonLabel, IonButton, IonImg } from '@ionic/angular/standalone';
import { FechaPipe } from '../pipes/fecha.pipe';
import { Aviso } from '../services/avisos.service';

@Component({
  selector: 'app-aviso-item',
  templateUrl: './aviso-item.component.html',
  styleUrls: ['./aviso-item.component.scss'],
  standalone: true,
  imports: [CommonModule, IonItem, IonLabel, IonButton, IonImg, FechaPipe]
})
export class AvisoItemComponent {
  @Input() aviso!: Aviso;
  @Output() eliminar = new EventEmitter<void>();
}
