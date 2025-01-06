import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxTextBoxModule,
  DxFormModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { FormTextboxComponent } from '../../utils/form-textbox/form-textbox.component';
import { getSizeQualifier } from '../../../services';
import { newCompany } from '../../../types/company';

@Component({
  selector: 'emp-new-form',
  imports: [
    DxTextBoxModule,
    DxFormModule,
    DxValidatorModule,
    FormTextboxComponent,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './emp-new-form.component.html',
  providers: [],
})
export class EmpNewFormComponent {
  newData = newCompany;
  getSizeQualifier = getSizeQualifier;
  constructor() {}

  getNewCompanyData = () => ({ ...this.newData });
}
