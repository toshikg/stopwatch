import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stopwatch'
})
export class StopwatchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value >= 0 && value < 10) {
      return '0' + Math.floor(value);
    }
    return '' + Math.floor(value);
  }

}
