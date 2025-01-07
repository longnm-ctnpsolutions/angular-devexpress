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
import { Contact } from '../../../types';
import { Company, CompanyBase } from '../../../types/company';
import { get, omit } from 'lodash';
import { BaseDataService } from '../../../services/base-data.service';
import notify from 'devextreme/ui/notify';
import { Employee } from '../../../types/employee';

@Component({
  selector: 'emp-form',
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
  ],
  standalone: true,
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.scss'],
})
export class EmpFormComponent {
  @Input() empData!: Employee;

  @Input() isLoading: boolean | undefined;

  savedData: Contact | null = null;

  isEditing = false;
  zipCodeValidator: ValidationRule = {
    type: 'pattern',
    pattern: /^\d{5}$/,
    message: 'Zip is invalid',
  };

  constructor(private service: BaseDataService) {}

  handleEditClick() {
    this.savedData = JSON.parse(JSON.stringify(this.empData));
    this.isEditing = true;
  }

  handleSaveClick({ validationGroup }: DxButtonTypes.ClickEvent) {
    if (!validationGroup.validate().isValid) return;
    const id: number = parseInt(this.empData.staffCode, 10);
    if (this.empData.phone) {
      this.empData.phone = this.empData.phone
        .replace(/\(\+84\)/, '0')
        .replace(/\D/g, '');
    }
    const newEmp = omit(
      this.empData,
      'image',
      'companyName',
      'companyID',
      'staffCode'
    );
    this.service.updateEmpPanel(newEmp, id).subscribe({
      next: (response) => {
        notify(
          {
            message: `Company "${newEmp.fullName}" saved`,
            position: { at: 'top center', my: 'top   center' },
          },
          'success'
        );
        this.service.notifyCompanyUpdated();
        return response;
      },
      error: (err) => {
        notify(
          {
            message: `${
              err.error ? err.error : 'Some thing went wrong. Please try again'
            }`,
            position: { at: 'top center', my: 'top   center' },
          },
          'error'
        );
      },
    });
    this.isEditing = !this.isEditing;
  }

  handleCancelClick() {
    this.empData = JSON.parse(JSON.stringify(this.savedData));
    this.isEditing = false;
  }
}
