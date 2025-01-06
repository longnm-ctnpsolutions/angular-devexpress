import { Component, ViewChild } from '@angular/core';
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
import { CompanyStatusComponent, FormPopupComponent } from '../../components';
import { Employee, userStatusList } from '../../types/employee';
import { BaseDataService } from '../../services/base-data.service';
import { Company, CompanyStatus, companyStatusList } from '../../types/company';
import { CompanyPanelComponent } from '../../components/library/company-panel/company-panel.component';
import { CompanyNewFormComponent } from '../../components/library/company-new-form/company-new-form.component';

@Component({
  templateUrl: './emp-list.component.html',
  standalone: true,
  imports: [
    DxButtonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxSelectBoxModule,
    DxTextBoxModule,

    FormPopupComponent,
    CommonModule,
    CompanyPanelComponent,
    CompanyNewFormComponent,
  ],
  styleUrls: ['./emp-list.component.scss'],
  providers: [BaseDataService],
})
export class EmpListComponent {
  @ViewChild(DxDataGridComponent, { static: true })
  dataGrid!: DxDataGridComponent;

  @ViewChild(CompanyNewFormComponent, { static: false })
  companyNewForm!: CompanyNewFormComponent;
  statusList = companyStatusList;

  isPanelOpened = false;

  isAddContactPopupOpened = false;

  companyID: number | null = null;

  companyList!: Company[];
  constructor(private service: BaseDataService) {}

  loadEmps(): Promise<Employee[]> {
    return new Promise((resolve, reject) => {
      this.service.getEmployees().subscribe({
        next: (emps) => {
          const transformedData = emps.map((emp) => ({
            ...emp,
          }));
          resolve(transformedData);
        },
        error: (error) => reject(error),
      });
    });
  }

  dataSource = new DataSource<Company[], string>({
    key: 'staffCode',
    load: async () => {
      const companies = await this.loadEmps();
      return companies;
    },
  });

  ngOnInit(): void {
    this.service.companyUpdated$.subscribe(() => {
      console.log('Company list updated!');
      (this.dataSource as DataSource).reload();
    });
  }

  onCompanyUpdated(): void {
    (this.dataSource as DataSource).reload();
  }
  addContact() {
    this.isAddContactPopupOpened = true;
  }

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

  formatPhone = (value: string | number): string => {
    let phone = value.toString();
    if (phone.startsWith('0')) {
      return (
        '(+84)' + phone.slice(1).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
      );
    }
    return phone;
  };

  customizePhoneCell = ({ value }: { value: string | number }) =>
    value ? this.formatPhone(value) : undefined;

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
    const body = this.companyNewForm.getNewCompanyData();
    this.service.createCompany(body).subscribe({
      next: (response) => {
        notify(
          {
            message: `Company "${body.companyName}" saved`,
            position: { at: 'top center', my: 'top   center' },
          },
          'success'
        );
        this.onCompanyUpdated();
        return response;
      },
      error: (err) => {
        notify(
          {
            message: `Some things went wrong`,
            position: { at: 'top center', my: 'top   center' },
          },
          'error'
        );
      },
    });
  };
}
