import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitDigits'
})
export class SplitDigitsPipe implements PipeTransform {

  transform(value: any, digit: any): any {
    const string = value.toString();
    const charactersArray = string.split('');
    return charactersArray[digit];
  }

}
