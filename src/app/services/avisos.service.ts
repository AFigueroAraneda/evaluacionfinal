import { Injectable, inject } from '@angular/core';
import { SqliteService } from './sqlite.service';

export interface Aviso {
  id?: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  foto?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AvisosService {
  private db = inject(SqliteService);

  obtenerAvisos(): Promise<Aviso[]> {
    return this.db.getAvisos();
  }

  agregarAviso(aviso: Aviso): Promise<void> {
    return this.db.addAviso(aviso);
  }

  eliminarAviso(id: number): Promise<void> {
    return this.db.deleteAviso(id);
  }
}
