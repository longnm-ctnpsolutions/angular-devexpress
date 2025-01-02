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
import { formatPhone } from '../../pipes/phone.pipe';
import { userStatusList } from '../../types/employee';
import { BaseDataService } from '../../services/base-data.service';
import { Company, CompanyStatus, companyStatusList } from '../../types/company';
import { CompanyPanelComponent } from '../../components/library/company-panel/company-panel.component';
import { CompanyNewFormComponent } from '../../components/library/company-new-form/company-new-form.component';

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

    FormPopupComponent,
    CompanyStatusComponent,
    CommonModule,
    CompanyPanelComponent,
    CompanyNewFormComponent,
  ],
  styleUrls: ['./company-list.component.scss'],
  providers: [BaseDataService],
})
export class CompanyListComponent {
  @ViewChild(DxDataGridComponent, { static: true })
  dataGrid!: DxDataGridComponent;

  @ViewChild(CompanyNewFormComponent, { static: false })
  companyNewForm!: CompanyNewFormComponent;
  statusList = companyStatusList;

  filterStatusList = ['All', ...companyStatusList];

  isPanelOpened = false;

  isAddContactPopupOpened = false;

  companyID: number | null = null;

  companyList!: Company[];

  //User
  userList = userStatusList;
  filterUserStatusList = ['All', ...userStatusList];

  // dataSource = new DataSource<Company[], string>({
  //   key: 'companyID',
  //   load: () =>
  //     new Promise((resolve, reject) => {
  //       this.service.getCompanies().subscribe({
  //         next: (companies) => {
  //           const transformedData = companies.map((company) => ({
  //             ...company,
  //             status: company.isActive ? 'Active' : 'InActive',
  //             image: this.service.generateRandomImage(),
  //           }));
  //           console.log(transformedData);
  //           resolve(transformedData);
  //         },
  //         error: (error) => reject(error),
  //       });
  //     }),
  // });

  loadCompanies(): Promise<Company[]> {
    return new Promise((resolve, reject) => {
      this.service.getCompanies().subscribe({
        next: (companies) => {
          const transformedData = companies.map((company) => ({
            ...company,
            status: company.isActive ? 'Active' : 'InActive',
            image: this.service.generateRandomImage(),
          }));
          resolve(transformedData);
        },
        error: (error) => reject(error),
      });
    });
  }

  dataSource = new DataSource<Company[], string>({
    key: 'companyID',
    load: async () => {
      const companies = await this.loadCompanies();
      return companies;
    },
  });

  constructor(private service: BaseDataService) {}

  addContact() {
    this.isAddContactPopupOpened = true;
  }

  refresh = () => {
    this.service.clearCache('companyList');
    this.loadCompanies().then((newData) => {
      this.dataGrid.instance.option(
        'dataSource',
        new DataSource({
          key: 'companyID',
          load: () => newData,
        })
      );
    });
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
    const body = this.companyNewForm.getNewCompanyData();
    this.service.createCompany(body).subscribe({
      next: (response) => {
        notify(
          {
            message: `New company "${body.companyName}" saved`,
            position: { at: 'top center', my: 'top   center' },
          },
          'success'
        );
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
