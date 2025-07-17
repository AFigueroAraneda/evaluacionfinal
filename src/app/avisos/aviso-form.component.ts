import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonTextarea, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AvisosService } from '../services/avisos.service';

@Component({
  selector: 'app-aviso-form',
  templateUrl: './aviso-form.component.html',
  styleUrls: ['./aviso-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonTextarea, IonButton]
})
export class AvisoFormComponent {
  form = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(20)]],
    foto: ['']
  });

  constructor(private fb: FormBuilder, private avisosService: AvisosService, private router: Router) {}

  async tomarFoto() {
    const image = await Camera.getPhoto({ resultType: CameraResultType.DataUrl });
    this.form.patchValue({ foto: image.dataUrl });
  }

  async guardar() {
    if (this.form.invalid) return;
    const data = this.form.value;
    await this.avisosService.agregarAviso({
      titulo: data.titulo!,
      descripcion: data.descripcion!,
      fecha: new Date().toISOString(),
      foto: data.foto || undefined
    });
    this.router.navigate(['/avisos']);
  }
}
