import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertRate',
  standalone: true
})
export class ConvertRatePipe implements PipeTransform {
  transform(rateFrom: number): number {
    const rateTo = 1 / rateFrom;
    return rateTo;
  }
}
