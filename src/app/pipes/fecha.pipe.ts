import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'fecha',
  standalone: true
})
/**
 * Pipe que formatea una fecha utilizando el {@link DatePipe} de Angular.
 * Se usa para mostrar fechas en el formato dd/MM/yyyy.
 */
export class FechaPipe implements PipeTransform {
  /**
   * Instancia de DatePipe empleada para dar formato a las fechas.
   * Se inyecta para utilizar la configuración regional definida en la aplicación.
   */
  constructor(private datePipe: DatePipe) {}

  /**
   * Recibe una fecha o una cadena y la devuelve con el formato dd/MM/yyyy.
   * @param value Fecha en formato Date o ISO string.
   * @returns Cadena con la fecha formateada.
   */
  transform(value: string | Date): string {
    return this.datePipe.transform(value, 'dd/MM/yyyy') ?? '';
  }
}
