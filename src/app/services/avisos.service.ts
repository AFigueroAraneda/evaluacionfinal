import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Aviso } from '../models/aviso';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root',
})
export class AvisosService {
  private connection: SQLiteConnection;
  private db?: SQLiteDBConnection;

  constructor(private sqliteSrv: SqliteService) {
    this.connection = new SQLiteConnection(CapacitorSQLite);
  }

  async init(): Promise<void> {
    await this.sqliteSrv.initWebPlugin();
    this.db = await this.connection.createConnection('avisosDB', false, 'no-encryption', 1, false);
    await this.db.open();
    const query = `CREATE TABLE IF NOT EXISTS avisos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      fecha TEXT NOT NULL,
      imagen TEXT
    );`;
    await this.db.execute(query);
  }

  async addAviso(aviso: Aviso): Promise<void> {
    if (!this.db) return;
    const stmt = `INSERT INTO avisos (titulo, descripcion, fecha, imagen) VALUES (?, ?, ?, ?)`;
    const values = [aviso.titulo, aviso.descripcion, aviso.fecha, aviso.imagen ?? null];
    await this.db.run(stmt, values);
  }

  async getAvisos(): Promise<Aviso[]> {
    if (!this.db) return [];
    const res = await this.db.query('SELECT * FROM avisos ORDER BY id DESC');
    return res.values as Aviso[];
  }

  async deleteAviso(id: number): Promise<void> {
    if (!this.db) return;
    await this.db.run('DELETE FROM avisos WHERE id = ?', [id]);
  }
}
