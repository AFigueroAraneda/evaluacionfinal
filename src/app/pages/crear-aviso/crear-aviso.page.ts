import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonTextarea, IonButton, IonImg } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AvisosService } from '../../services/avisos.service';

@Component({
  selector: 'app-crear-aviso',
  standalone: true,
  templateUrl: './crear-aviso.page.html',
  styleUrls: ['./crear-aviso.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonTextarea, IonButton, IonImg, ReactiveFormsModule]
})
export class CrearAvisoPage {
  form: FormGroup;
  foto?: string;

  constructor(private fb: FormBuilder, private avisosService: AvisosService, private router: Router) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 60
    });
    this.foto = image.dataUrl;
  }

  async guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const aviso = {
      titulo: this.form.value.titulo,
      descripcion: this.form.value.descripcion,
      imagen: this.foto || '',
      fecha: new Date().toISOString()
    };
    await this.avisosService.addAviso(aviso);
    this.router.navigateByUrl('/');
  }
}
