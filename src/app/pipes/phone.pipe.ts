import { NgModule, Pipe, PipeTransform } from '@angular/core';

export function formatPhone(value : any) {
  return String(value).replace(/(\d{3})(\d{3})(\d{4})/, '+1($1)$2-$3');
}

@Pipe({
  name: 'phone',
  standalone: true
})
export class PhonePipe implements PipeTransform {
  transform(value: number): any {
   return formatPhone(value);
  }
}

