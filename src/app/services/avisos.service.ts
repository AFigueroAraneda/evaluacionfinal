import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { isPlatform } from '@ionic/angular';

export interface Aviso {
  id?: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  fecha: string;
}

@Injectable({ providedIn: 'root' })
export class AvisosService {
  private sqlite = new SQLiteConnection(CapacitorSQLite);
  private db: SQLiteDBConnection | null = null;

  constructor() {
    this.init();
  }

  private async initWebPlugin(): Promise<void> {
    await customElements.whenDefined('jeep-sqlite');
    const jeepSqliteEl = document.querySelector('jeep-sqlite');
    if (jeepSqliteEl != null) {
      await this.sqlite.initWebStore();
    }
  }

  async init(): Promise<void> {
    if (!isPlatform('hybrid')) {
      await this.initWebPlugin();
    }
    this.db = await this.sqlite.createConnection('avisosdb', false, 'no-encryption', 1);
    await this.db.open();
    await this.db.execute(`CREATE TABLE IF NOT EXISTS avisos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      imagen TEXT,
      fecha TEXT NOT NULL
    );`);
  }

  async getAvisos(): Promise<Aviso[]> {
    if (!this.db) {
      return [];
    }
    const res = await this.db.query('SELECT * FROM avisos ORDER BY id DESC');
    return res.values as Aviso[];
  }

  async addAviso(aviso: Aviso): Promise<void> {
    if (!this.db) {
      return;
    }
    const { titulo, descripcion, imagen, fecha } = aviso;
    await this.db.run('INSERT INTO avisos (titulo, descripcion, imagen, fecha) VALUES (?, ?, ?, ?)', [titulo, descripcion, imagen, fecha]);
  }

  async deleteAviso(id: number): Promise<void> {
    if (!this.db) {
      return;
    }
    await this.db.run('DELETE FROM avisos WHERE id = ?', [id]);
  }
}
