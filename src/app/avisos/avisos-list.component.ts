import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AvisosService, Aviso } from '../services/avisos.service';
import { AvisoItemComponent } from './aviso-item.component';

@Component({
  selector: 'app-avisos-list',
  templateUrl: './avisos-list.component.html',
  styleUrls: ['./avisos-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonFab, IonFabButton, IonIcon, AvisoItemComponent]
})
export class AvisosListComponent implements OnInit {
  avisos: Aviso[] = [];

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

  async borrarAviso(aviso: Aviso) {
    if (aviso.id && confirm('¿Eliminar aviso?')) {
      await this.avisosService.eliminarAviso(aviso.id);
      await this.cargar();
    }
  }

  nuevo() {
    this.router.navigate(['/avisos/nuevo']);
  }
}
