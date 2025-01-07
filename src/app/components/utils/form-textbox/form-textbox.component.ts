import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxTextBoxModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { ValidationRule } from 'devextreme-angular/common';
export interface CustomValidationRule {
  type: string;
  message?: string;
  [key: string]: any;
}

@Component({
  selector: 'form-textbox',
  imports: [DxButtonModule, DxTextBoxModule, DxValidatorModule, CommonModule],
  standalone: true,
  templateUrl: './form-textbox.component.html',
  styleUrls: ['form-textbox.component.scss'],
})
export class FormTextboxComponent {
  @Input() isEditing = false;

  @Input() text!: string;

  @Input() label = '';

  @Input() mask!: string;

  @Input() icon: string | null = null;

  // @Input() validators: ValidationRule[] = [{ type: 'required' }];

  @Input() fieldName:
    | 'CompanyName'
    | 'Address'
    | 'Phone'
    | 'Email'
    | 'FullName'
    | 'None'
    | 'Industry' = 'CompanyName';

  @Input() value!: string;

  @Input() isPhoneNumber = false;

  @Output() valueChange = new EventEmitter<string>();

  @Input() validators: ValidationRule[] = [];

  get dynamicValidators(): ValidationRule[] {
    switch (this.fieldName) {
      case 'CompanyName':
        return [
          { type: 'required', message: 'Company name is required' },
          {
            type: 'stringLength',
            min: 2,
            max: 100,
            message: 'Name must be between 2 and 100 characters',
          },
        ];
      case 'Address':
        return [
          { type: 'required', message: 'Address is required' },
          {
            type: 'stringLength',
            min: 2,
            max: 200,
            message: 'Address must be between 2 and 200 characters',
          },
        ];
      case 'Phone':
        return [
          { type: 'required', message: 'Phone number is required' },
          {
            type: 'pattern',
            pattern: /^\d{8,11}$/,
            message: 'Phone number must be between 10 and 11 digits',
          },
        ];
      case 'Email':
        return [
          { type: 'required', message: 'Email is required' },
          {
            type: 'pattern',
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Invalid email format',
          },
        ];
      case 'Industry':
        return [
          { type: 'required', message: 'Industry is required' },
          {
            type: 'stringLength',
            min: 5,
            max: 50,
            message: 'Industry must be between 5 and 50 characters',
          },
        ];
      case 'FullName':
        return [
          { type: 'required', message: 'Full name is required' },
          {
            type: 'stringLength',
            min: 5,
            max: 50,
            message: 'Full name must be between 2 and 50 characters',
          },
        ];
      case 'None':
        return [];
      default:
        return [];
    }
  }

  valueChanged(e: any) {
    let newValue = e.value;
    if (this.isPhoneNumber && newValue) {
      newValue = this.normalizePhoneNumber(newValue, false);
    }
    this.valueChange.emit(newValue);
  }

  private normalizePhoneNumber(phone: string, forOutput = true): string {
    if (forOutput) {
      const normalized = phone.replace(/[^\d]/g, '');
      if (normalized.startsWith('84')) {
        return `+${normalized}`;
      } else if (normalized.startsWith('0')) {
        return `+84${normalized.substring(1)}`;
      }
    }
    return phone;
  }
}
