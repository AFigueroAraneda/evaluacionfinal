import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonItem, IonLabel, IonButton, IonImg } from '@ionic/angular/standalone';
import { FechaPipe } from '../pipes/fecha.pipe';
import { Aviso } from '../services/avisos.service';

/**
 * Representa un elemento de la lista de avisos. Muestra la información del aviso
 * junto con la opción de eliminarlo.
 */

@Component({
  selector: 'app-aviso-item',
  templateUrl: './aviso-item.component.html',
  styleUrls: ['./aviso-item.component.scss'],
  standalone: true,
  imports: [CommonModule, IonItem, IonLabel, IonButton, IonImg, FechaPipe]
})
export class AvisoItemComponent {
  /** Aviso que se mostrará en el item. */
  @Input() aviso!: Aviso;
  /** Emite un evento cuando el usuario solicita eliminar el aviso. */
  @Output() eliminar = new EventEmitter<void>();
}
