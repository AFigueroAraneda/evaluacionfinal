import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'fecha',
  standalone: true,
  providers: [DatePipe]
})
export class FechaPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(value: string | Date): string | null {
    return this.datePipe.transform(value, 'shortDate');
  }
}
