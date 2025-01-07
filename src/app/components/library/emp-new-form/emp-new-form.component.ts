import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxTextBoxModule,
  DxFormModule,
  DxValidatorModule,
  DxDropDownButtonModule,
} from 'devextreme-angular';
import { FormTextboxComponent } from '../../utils/form-textbox/form-textbox.component';
import { getSizeQualifier } from '../../../services';
import { CompanySummary, newCompany } from '../../../types/company';
import { BaseDataService } from '../../../services/base-data.service';
import { ChangeDetectorRef } from '@angular/core';
import { newEmployee } from '../../../types/employee';
import notify from 'devextreme/ui/notify';
@Component({
  selector: 'emp-new-form',
  imports: [
    DxTextBoxModule,
    DxFormModule,
    DxDropDownButtonModule,
    DxValidatorModule,

    FormTextboxComponent,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './emp-new-form.component.html',
  providers: [],
})
export class EmpNewFormComponent {
  newData = newEmployee;
  companies: CompanySummary[] = [];

  filterStatusList: any[] = [{ companyID: -1, companyName: 'Choose Company' }];
  selectedCompanyID: number | null = null;
  getNewEmpData = () => ({ ...this.newData });

  ngOnInit(): void {
    this.loadCompanies();
  }
  getSizeQualifier = getSizeQualifier;

  constructor(
    private service: BaseDataService,
    private cdRef: ChangeDetectorRef
  ) {}

  loadCompanies(): Promise<CompanySummary[]> {
    return new Promise((resolve, reject) => {
      this.service.getCompanies().subscribe({
        next: (companies) => {
          this.companies = companies;
          const transformedData = companies.map((company) => ({
            companyID: company.companyID,
            companyName: company.companyName,
          }));
          this.filterStatusList = [
            { companyID: -1, companyName: 'Choose Company' },
            ...transformedData,
          ];
          resolve(transformedData);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }
  onValueChanged(event: any) {
    console.log('Event:', event);
    const selectedCompany = event.item;

    if (selectedCompany) {
      this.selectedCompanyID = selectedCompany.companyID;
      this.newData.companyID = this.selectedCompanyID ?? 0;
    } else {
      this.selectedCompanyID = null;
      this.newData.companyID = 0;
      notify(
        {
          message: `You must select a company before proceeding.`,
          position: { at: 'top center', my: 'top center' },
        },
        'error',
        3000
      );
    }

    this.cdRef.detectChanges();
  }
}
