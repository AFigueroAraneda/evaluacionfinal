import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AvisoListComponent } from '../components/aviso-list.component';
import { ConfirmDeleteComponent } from '../components/confirm-delete.component';
import { AvisosService } from '../services/avisos.service';
import { Aviso } from '../models/aviso';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, AvisoListComponent, ConfirmDeleteComponent],
})
export class HomePage {
  avisos: Aviso[] = [];
  @ViewChild(ConfirmDeleteComponent) confirmRef?: ConfirmDeleteComponent;

  constructor(private avisosService: AvisosService, private router: Router) {}

  ionViewWillEnter() {
    this.load();
  }

  async load() {
    await this.avisosService.init();
    this.avisos = await this.avisosService.getAvisos();
  }

  borrar(id: number) {
    this.confirmRef?.ask(id);
  }

  confirmar(id: number) {
    this.avisosService.deleteAviso(id).then(() => this.load());
  }

  crear() {
    this.router.navigateByUrl('/crear-aviso');
  }
}
