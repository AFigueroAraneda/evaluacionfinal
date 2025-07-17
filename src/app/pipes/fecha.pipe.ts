import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha',
  standalone: true
})
export class FechaPipe implements PipeTransform {
  transform(value: string | Date): string {
    const date = new Date(value);
    return date.toLocaleDateString();
  }
}
