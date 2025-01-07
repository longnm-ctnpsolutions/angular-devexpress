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
import DataSource from 'devextreme/data/data_source';
import { CommonModule } from '@angular/common';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { jsPDF } from 'jspdf';
import notify from 'devextreme/ui/notify';
import { FormPopupComponent } from '../../components';
import { Employee } from '../../types/employee';
import { BaseDataService } from '../../services/base-data.service';
import { Company, companyStatusList } from '../../types/company';
import { EmpPanelComponent } from '../../components/library/emp-panel/emp-panel.component';
import { EmpNewFormComponent } from '../../components/library/emp-new-form/emp-new-form.component';

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
    EmpPanelComponent,
    EmpNewFormComponent,
  ],
  styleUrls: ['./emp-list.component.scss'],
  providers: [BaseDataService],
})
export class EmpListComponent {
  @ViewChild(DxDataGridComponent, { static: true })
  dataGrid!: DxDataGridComponent;

  @ViewChild(EmpNewFormComponent, { static: false })
  empNewForm!: EmpNewFormComponent;
  statusList = companyStatusList;

  isPanelOpened = false;

  isAddContactPopupOpened = false;

  staffCode: number | null = null;

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
    this.staffCode = data.staffCode;
    this.isPanelOpened = true;
  }

  onOpenedChange = (value: boolean) => {
    if (!value) {
      this.staffCode = null;
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
    const body = this.empNewForm.getNewEmpData();
    if (body.companyID == -1) {
      notify(
        {
          message: `You must select a company before saving.`,
          position: { at: 'top center', my: 'top center' },
        },
        'error',
        3000
      );
      return;
    }
    console.log(body);
    this.service.createEmp(body).subscribe({
      next: (response) => {
        notify(
          {
            message: `Company "${body.fullName}" saved`,
            position: { at: 'top center', my: 'top   center' },
          },
          'success'
        );
        this.onCompanyUpdated();
        this.isAddContactPopupOpened = false;
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
        console.log(err);
      },
    });
  };
}
