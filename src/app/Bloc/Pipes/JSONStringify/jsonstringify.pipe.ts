import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'JSONStringify'
})
export class JSONStringifyPipe implements PipeTransform {

  transform(value: any): string {
    return JSON.stringify(value, null, 2);
  }

}
