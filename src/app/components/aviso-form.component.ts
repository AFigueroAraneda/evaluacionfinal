import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonButton, IonInput, IonTextarea, IonImg } from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Aviso } from '../models/aviso';

@Component({
  selector: 'app-aviso-form',
  templateUrl: './aviso-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonButton, IonInput, IonTextarea, IonImg],
})
export class AvisoFormComponent {
  @Output() save = new EventEmitter<Aviso>();

  form = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(20)]],
    imagen: [''],
  });

  constructor(private fb: FormBuilder) {}

  async tomarFoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 60,
    });
    this.form.patchValue({ imagen: photo.dataUrl });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const aviso: Aviso = {
      titulo: this.form.value.titulo!,
      descripcion: this.form.value.descripcion!,
      fecha: new Date().toISOString(),
      imagen: this.form.value.imagen ?? undefined,
    };
    this.save.emit(aviso);
    this.form.reset();
  }
}
