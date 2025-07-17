import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private sqlite = CapacitorSQLite;
  private sqliteConnection = new SQLiteConnection(this.sqlite);
  private db?: SQLiteDBConnection;

  constructor() {}

  private async iniciarPluginWeb(): Promise<void> {
    await customElements.whenDefined('jeep-sqlite');
    const jeepSqliteEl = document.querySelector('jeep-sqlite');
    if (jeepSqliteEl != null) {
      await this.sqlite.initWebStore();
    }
  }

  private async openDB(): Promise<void> {
    if (!this.db) {
      if (Capacitor.getPlatform() === 'web') {
        await this.iniciarPluginWeb();
      }
      this.db = await this.sqliteConnection.createConnection('avisos', false, 'no-encryption', 1, false);
      await this.db.open();
      await this.db.execute(`CREATE TABLE IF NOT EXISTS avisos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        fecha TEXT NOT NULL,
        foto TEXT
      );`);
    }
  }

  async getAvisos() {
    await this.openDB();
    const res = await this.db!.query('SELECT * FROM avisos ORDER BY id DESC;');
    return res.values ?? [];
  }

  async addAviso(aviso: { titulo: string; descripcion: string; fecha: string; foto?: string; }) {
    await this.openDB();
    const sql = 'INSERT INTO avisos (titulo, descripcion, fecha, foto) VALUES (?,?,?,?);';
    await this.db!.run(sql, [aviso.titulo, aviso.descripcion, aviso.fecha, aviso.foto]);
  }

  async deleteAviso(id: number) {
    await this.openDB();
    await this.db!.run('DELETE FROM avisos WHERE id = ?;', [id]);
  }
}
