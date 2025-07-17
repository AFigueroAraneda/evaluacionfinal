import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList } from '@ionic/angular/standalone';
import { Aviso } from '../models/aviso';
import { AvisoItemComponent } from './aviso-item.component';

@Component({
  selector: 'app-aviso-list',
  template: `
    <ion-list>
      <app-aviso-item *ngFor="let aviso of avisos" [aviso]="aviso" (delete)="delete.emit($event)"></app-aviso-item>
    </ion-list>
  `,
  standalone: true,
  imports: [CommonModule, IonList, AvisoItemComponent],
})
export class AvisoListComponent {
  @Input() avisos: Aviso[] = [];
  @Output() delete = new EventEmitter<number>();
}
