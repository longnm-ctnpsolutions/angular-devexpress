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
  newData = newCompany;
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
          console.log('Dữ liệu công ty:', companies);
          this.companies = companies;
          const transformedData = companies.map((company) => ({
            companyID: company.companyID,
            companyName: company.companyName,
          }));
          console.log('Dữ liệu sau khi chuyển đổi:', transformedData);
          this.filterStatusList = [
            { companyID: -1, companyName: 'Choose Company' },
            ...transformedData,
          ];
          console.log('filterStatusList:', this.filterStatusList);
          resolve(transformedData);
        },
        error: (error) => {
          console.error('Lỗi khi tải công ty:', error);
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
      console.log('ID công ty đã chọn:', this.selectedCompanyID);
      console.log('Công ty đã chọn:', selectedCompany.companyName);
    } else {
      // Nếu không chọn, gán về null
      this.selectedCompanyID = null;
      console.log('Chưa chọn công ty');
    }

    // Yêu cầu Angular kiểm tra lại sự thay đổi sau khi cập nhật
    this.cdRef.detectChanges();
  }
}
