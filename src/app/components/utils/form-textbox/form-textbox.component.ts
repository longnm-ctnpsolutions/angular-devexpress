import {Component, EventEmitter, Input, NgModule, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxTextBoxModule,
  DxValidatorModule
} from 'devextreme-angular';
import { ValidationRule } from 'devextreme-angular/common';

@Component({
  selector: 'form-textbox',
   imports: [
    DxButtonModule,
    DxTextBoxModule,
    DxValidatorModule,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './form-textbox.component.html',
  styleUrls: ['form-textbox.component.scss'],
})
export class FormTextboxComponent {
  @Input() isEditing = false;

  @Input() text!: string;

  @Input() label = '';

  @Input() mask!: string ;

  @Input() icon: string | null =null;

  @Input() validators: ValidationRule[] = [{ type: 'required' }];

  @Input() value!: string;

  @Output() valueChange = new EventEmitter<string>();

  valueChanged(e: any) {
    this.valueChange.emit(e.value);
  }

}

