import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyStatus } from '../../../types/company';
@Component({
  selector: 'company-status',
  imports: [CommonModule],
  standalone: true,
  template: `
    <span class="status status-{{ value | lowercase }}">{{
      showText ? value : ''
    }}</span>
  `,
  styleUrls: ['./company-status.component.scss'],
})
export class CompanyStatusComponent {
  @Input() value!: CompanyStatus;

  @Input() showText = true;
}
