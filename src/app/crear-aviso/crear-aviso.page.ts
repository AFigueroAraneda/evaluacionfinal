import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { AvisoFormComponent } from '../components/aviso-form.component';
import { AvisosService } from '../services/avisos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-aviso',
  templateUrl: 'crear-aviso.page.html',
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, AvisoFormComponent],
})
export class CrearAvisoPage {
  constructor(private avisosService: AvisosService, private router: Router) {}

  guardar(aviso: any) {
    this.avisosService.addAviso(aviso);
    this.router.navigateByUrl('/home');
  }
}
