import { Component, ViewChild, NgModule } from '@angular/core';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDataGridComponent,
  DxDropDownButtonModule,
  DxSelectBoxModule,
  DxTextBoxModule,
} from 'devextreme-angular';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';
import { exportDataGrid as exportDataGridToXLSX } from 'devextreme/excel_exporter';
import { DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';
import DataSource from 'devextreme/data/data_source';
import { CommonModule } from '@angular/common';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { jsPDF } from 'jspdf';
import notify from 'devextreme/ui/notify';
import {
  CompanyStatusComponent,
  ContactNewFormComponent,
  FormPopupComponent,
} from '../../components';
import { formatPhone } from '../../pipes/phone.pipe';
import { userStatusList } from '../../types/employee';
import { BaseDataService } from '../../services/base-data.service';
import { Company, CompanyStatus, companyStatusList } from '../../types/company';
import { CompanyPanelComponent } from '../../components/library/company-panel/company-panel.component';

type FilterCompanyStatus = CompanyStatus | 'All';

@Component({
  templateUrl: './company-list.component.html',
  standalone: true,
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    ContactNewFormComponent,
    FormPopupComponent,
    CompanyStatusComponent,
    CommonModule,
    CompanyPanelComponent,
  ],
  styleUrls: ['./company-list.component.scss'],
  providers: [BaseDataService],
})
export class CompanyListComponent {
  @ViewChild(DxDataGridComponent, { static: true })
  dataGrid!: DxDataGridComponent;

  @ViewChild(ContactNewFormComponent, { static: false })
  contactNewForm!: ContactNewFormComponent;
  statusList = companyStatusList;

  filterStatusList = ['All', ...companyStatusList];

  isPanelOpened = false;

  isAddContactPopupOpened = false;

  companyID: number | null = null;

  companyList!: Company[];

  //User
  userList = userStatusList;
  filterUserStatusList = ['All', ...userStatusList];

  
  dataSource = new DataSource<Company[], string>({
    key: 'companyID',
    load: () =>
      new Promise((resolve, reject) => {
        const cachedData = this.service.getCompanyList();
        if (cachedData && cachedData.length > 0) {
          resolve(cachedData);
        } else {
          this.service.getCompanies().subscribe({
            next: (data: Company[]) => {
              const transformedData = data.map((company) => ({
                ...company,
                status: company.isActive ? 'Active' : 'InActive',
                image: this.service.generateRandomImage(),
              }));
              this.companyList = transformedData;
              this.service.setCompanyList(this.companyList);
              resolve(this.companyList);
              console.log('Data loaded from API:', this.companyList);
            },
            error: ({ message }: any) => reject(message),
          });
        }
      }),
  });

  constructor(private service: BaseDataService) {}

  addContact() {
    this.isAddContactPopupOpened = true;
  }

  refresh = () => {
    this.dataGrid.instance.refresh();
  };

  rowClick(e: DxDataGridTypes.RowClickEvent) {
    const { data } = e;
    this.companyID = data.companyID;
    this.isPanelOpened = true;
  }

  onOpenedChange = (value: boolean) => {
    if (!value) {
      this.companyID = null;
    }
  };

  onPinnedChange = () => {
    this.dataGrid.instance.updateDimensions();
  };

  filterByStatus = (e: DxDropDownButtonTypes.SelectionChangedEvent) => {
    const { item: status }: { item: FilterCompanyStatus } = e;

    if (status === 'All') {
      this.dataGrid.instance.clearFilter();
    } else {
      this.dataGrid.instance.filter(['status', '=', status]);
    }
  };

  customizePhoneCell = ({ value }: { value: string | number }) =>
    value ? formatPhone(value) : undefined;

  onExporting(e: any) {
    if (e.format === 'pdf') {
      const doc = new jsPDF();
      exportDataGridToPdf({
        jsPDFDocument: doc,
        component: e.component,
      }).then(() => {
        doc.save('Companies.pdf');
      });
    } else {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Companies');

      exportDataGridToXLSX({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(
            new Blob([buffer], { type: 'application/octet-stream' }),
            'Companys.xlsx'
          );
        });
      });
      e.cancel = true;
    }
  }

  onClickSaveNewContact = () => {
    const { firstName, lastName } = this.contactNewForm.getNewContactData();
    notify(
      {
        message: `New contact "${firstName} ${lastName}" saved`,
        position: { at: 'bottom center', my: 'bottom center' },
      },
      'success'
    );
  };
}
