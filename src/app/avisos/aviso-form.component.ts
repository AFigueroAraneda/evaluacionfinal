import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonTextarea, IonButton, IonImg } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AvisosService } from '../services/avisos.service';

/**
 * Componente responsable de mostrar el formulario de creación de avisos.
 * Permite introducir título, descripción y una foto opcional que se obtiene
 * utilizando la cámara del dispositivo.
 */

@Component({
  selector: 'app-aviso-form',
  templateUrl: './aviso-form.component.html',
  styleUrls: ['./aviso-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonTextarea, IonButton, IonImg]
})
export class AvisoFormComponent {
  /**
   * Grupo de controles del formulario para crear un nuevo aviso.
   * Incluye validaciones mínimas para título y descripción.
   */
  form = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(20)]],
    foto: ['']
  });

  constructor(private fb: FormBuilder, private avisosService: AvisosService, private router: Router) {}

  /**
   * Invoca la cámara del dispositivo y guarda la imagen obtenida en el
   * formulario para su posterior envío.
   */
  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({ resultType: CameraResultType.DataUrl });
      this.form.patchValue({ foto: image.dataUrl });
    } catch (err) {
      console.error('Camera error', err);
    }
  }

  /**
   * Envía el formulario al servicio de avisos y navega de vuelta a la lista.
   */
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
