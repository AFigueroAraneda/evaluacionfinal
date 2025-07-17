import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';

@Injectable({
  providedIn: 'root',
})
export class SqliteService {
  private sqlite = CapacitorSQLite;
  private connection: SQLiteConnection;

  constructor() {
    this.connection = new SQLiteConnection(this.sqlite);
    jeepSqlite(window);
  }

  async initWebPlugin(): Promise<void> {
    if (Capacitor.getPlatform() === 'web') {
      await customElements.whenDefined('jeep-sqlite');
      const jeepEl = document.querySelector('jeep-sqlite');
      if (jeepEl != null) {
        await this.sqlite.initWebStore();
      }
    }
  }
}
