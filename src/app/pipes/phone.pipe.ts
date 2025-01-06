import { NgModule, Pipe, PipeTransform } from '@angular/core';

export function formatPhone(value: any) {
  if (value.startsWith('0')) {
    return (
      '(+84)' + value.slice(1).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    );
  }

  return value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

@Pipe({
  name: 'phone',
  standalone: true,
})
export class PhonePipe implements PipeTransform {
  transform(value: number): any {
    return formatPhone(value);
  }
}
