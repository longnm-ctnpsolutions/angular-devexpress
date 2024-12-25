import {
  Component, Input, NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactStatus } from '../../../types/contact';
@Component({
  selector: 'contact-status',
    imports: [CommonModule],
    standalone: true,
  template: `
  <span class="status status-{{ value | lowercase }}">{{ showText ? value : '' }}</span>
`,
  styleUrls: ['./contact-status.component.scss'],
})
export class ContactStatusComponent {
  @Input() value!: ContactStatus;

  @Input() showText = true;
}
