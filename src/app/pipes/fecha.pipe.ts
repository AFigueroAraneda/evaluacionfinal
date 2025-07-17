import { Pipe, PipeTransform, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'fecha',
  standalone: true,
  providers: [DatePipe]
})
export class FechaPipe implements PipeTransform {
  private datePipe = inject(DatePipe);

  transform(value: string | Date, format: string = 'mediumDate'): string | null {
    return this.datePipe.transform(value, format);
  }
}
