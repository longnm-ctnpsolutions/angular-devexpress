import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxSelectBoxModule,
  DxTextBoxModule,
  DxValidatorComponent,
  DxValidatorModule,
} from 'devextreme-angular';
import { ValidationRule, EditorStyle } from 'devextreme-angular/common';
// import { ContactStatusComponent } from '../../utils/contact-status/contact-status.component';
// import { ApplyPipe } from '../../../pipes/apply.pipe';

@Component({
  selector: 'password-text-box',
  imports: [
    // ApplyPipe,
    DxSelectBoxModule,
    DxTextBoxModule,
    // ContactStatusComponent,
    DxValidatorModule,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './password-text-box.component.html',
  styles: [],
})
export class PasswordTextBoxComponent {
  @ViewChild('validator', { static: true }) validator!: DxValidatorComponent;

  @Input() value!: string;

  @Input() placeholder = '';

  @Input() stylingMode: EditorStyle = 'outlined';

  @Input() validators: ValidationRule[] = [];

  @Output() valueChange = new EventEmitter<string>();

  @Output() valueChanged = new EventEmitter<string>();

  isPasswordMode = true;

  constructor() {}

  switchMode = () => {
    this.isPasswordMode = !this.isPasswordMode;
  };

  onValueChange(value: string) {
    this.value = value;
    this.valueChange.emit(value);
    this.valueChanged.emit(value);
  }

  revalidate() {
    this.validator?.instance.validate();
  }
}
