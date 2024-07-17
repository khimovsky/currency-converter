import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSlice',
  standalone: true
})
export class NumberSlicePipe implements PipeTransform {
  transform(value: number, start: number, end: number): number {
    const valueString = value.toString();
    const slicedString = valueString.slice(start, end);
    return parseFloat(slicedString);
  }
}
