import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apply',
  standalone: true,
})
export class ApplyPipe implements PipeTransform {
  transform(value: Record<string, any> | ((...args: any[]) => any), ...args: any[]): any {
    if (typeof value === 'function') {
      return value({}, ...args); // Truyền object trống làm target cho Object.assign
    }

    if (typeof value === 'object' && value !== null) {
      return Object.assign({}, value, ...args); // Merge trực tiếp nếu là object
    }

    return null; // Trả về null nếu không phải là hàm hoặc object hợp lệ
  }
}
