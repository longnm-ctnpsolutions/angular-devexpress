import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxTextBoxModule,
  DxFormModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { FormTextboxComponent } from '../../utils/form-textbox/form-textbox.component';
import { getSizeQualifier } from '../../../services';
import { FormPhotoUploaderComponent } from '../../utils/form-photo-uploader/form-photo-uploader.component';
import { newCompany } from '../../../types/company';

@Component({
  selector: 'company-new-form',
  imports: [
    DxTextBoxModule,
    DxFormModule,
    DxValidatorModule,

    FormTextboxComponent,
    FormPhotoUploaderComponent,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './company-new-form.component.html',
  providers: [],
})
export class CompanyNewFormComponent {
  newData = newCompany;
  getSizeQualifier = getSizeQualifier;
  constructor() {}

  getNewCompanyData = () => ({ ...this.newData });
}
