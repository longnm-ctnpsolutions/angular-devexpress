import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxFormModule,
  DxLoadPanelModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxValidatorModule,
  DxValidationGroupModule,
} from 'devextreme-angular';
import { ValidationRule } from 'devextreme-angular/common';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { FormTextboxComponent } from '../../utils/form-textbox/form-textbox.component';
import { FormPhotoComponent } from '../../utils/form-photo/form-photo.component';
import { ToolbarFormComponent } from '../../utils/toolbar-form/toolbar-form.component';
import { StatusSelectBoxComponent } from '../status-select-box/status-select-box.component';
import { Contact } from '../../../types';
import { Company } from '../../../types/company';

@Component({
  selector: 'company-form',
  imports: [
    DxFormModule,
    DxSelectBoxModule,
    DxButtonModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxLoadPanelModule,
    DxValidationGroupModule,

    FormTextboxComponent,
    FormPhotoComponent,
    DxValidatorModule,
    ToolbarFormComponent,
    CommonModule,
    StatusSelectBoxComponent,
  ],
  standalone: true,
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent {
  @Input() companyData: Company | undefined;

  @Input() isLoading: boolean | undefined;

  savedData: Contact | null = null;

  isEditing = false;
  zipCodeValidator: ValidationRule = {
    type: 'pattern',
    pattern: /^\d{5}$/,
    message: 'Zip is invalid',
  };

  handleEditClick() {
    this.savedData = JSON.parse(JSON.stringify(this.companyData));
    this.isEditing = true;
  }

  handleSaveClick({ validationGroup }: DxButtonTypes.ClickEvent) {
    if (!validationGroup.validate().isValid) return;
    this.isEditing = false;
    this.savedData = null;
  }

  handleCancelClick() {
    this.companyData = JSON.parse(JSON.stringify(this.savedData));
    this.isEditing = false;
  }
}
