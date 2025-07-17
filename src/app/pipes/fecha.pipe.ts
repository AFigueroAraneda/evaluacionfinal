import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'fecha',
  standalone: true,
})
export class FechaPipe implements PipeTransform {
  private datePipe = new DatePipe('es-ES');
  transform(value: string | Date): string | null {
    return this.datePipe.transform(value, 'dd/MM/yyyy HH:mm');
  }
}
