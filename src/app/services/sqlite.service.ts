import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

const DB_NAME = 'avisos';
const DB_VERSION = 1;
const DB_ENCRYPTED = false;
const DB_MODE = 'no-encryption';
const DB_READONLY = false;

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private sqlite = CapacitorSQLite;
  private sqliteConnection = new SQLiteConnection(this.sqlite);
  private db?: SQLiteDBConnection;
  private plataforma = Capacitor.getPlatform();

  constructor() {
    this.iniciarPlugin();
  }

  private async iniciarPluginWeb(): Promise<void> {
    await customElements.whenDefined('jeep-sqlite');
    const jeepSqliteEl = document.querySelector('jeep-sqlite');
    if (jeepSqliteEl != null) {
      await this.sqlite.initWebStore();
    }
  }

  private async abrirConexion(): Promise<void> {
    const ret = await this.sqliteConnection.checkConnectionsConsistency();
    const isConn = (await this.sqliteConnection.isConnection(DB_NAME, DB_READONLY)).result;
    if (ret.result && isConn) {
      this.db = await this.sqliteConnection.retrieveConnection(DB_NAME, DB_READONLY);
    } else {
      this.db = await this.sqliteConnection.createConnection(
        DB_NAME,
        DB_ENCRYPTED,
        DB_MODE,
        DB_VERSION,
        DB_READONLY
      );
    }
    const openResult = await this.db.isDBOpen();
    if (!openResult.result) {
      await this.db.open();
    }
  }

  private async iniciarPlugin(): Promise<void> {
    if (this.plataforma === 'web') {
      await this.iniciarPluginWeb();
    }
    await this.abrirConexion();
    await this.db!.execute(`CREATE TABLE IF NOT EXISTS avisos(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      fecha TEXT NOT NULL,
      foto TEXT
    );`);
  }

  async getAvisos() {
    await this.abrirConexion();
    const res = await this.db!.query('SELECT * FROM avisos ORDER BY id DESC;');
    return res.values ?? [];
  }

  async addAviso(aviso: { titulo: string; descripcion: string; fecha: string; foto?: string; }) {
    await this.abrirConexion();
    const sql = 'INSERT INTO avisos (titulo, descripcion, fecha, foto) VALUES (?,?,?,?);';
    await this.db!.run(sql, [aviso.titulo, aviso.descripcion, aviso.fecha, aviso.foto]);
  }

  async deleteAviso(id: number) {
    await this.abrirConexion();
    await this.db!.run('DELETE FROM avisos WHERE id = ?;', [id]);
  }
}
