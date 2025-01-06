import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxScrollViewModule,
} from 'devextreme-angular';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DataService } from '../../services';
import { Contact } from '../../types';
import { BaseDataService } from '../../services/base-data.service';

import { Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { Employee } from '../../types/employee';
import { EmpFormComponent } from '../../components/library/emp-form/emp-form.component';

@Component({
  templateUrl: './emp-details.component.html',
  imports: [
    DxButtonModule,
    DxDropDownButtonModule,
    DxScrollViewModule,
    DxToolbarModule,
    CommonModule,
    EmpFormComponent,
  ],
  standalone: true,
  styleUrls: ['./emp-details.component.scss'],
  providers: [DataService, BaseDataService],
})
export class EmpDetailsComponent implements OnInit {
  contactId = 12;

  contactData: Contact | undefined;

  contactName = 'Loading...';

  isLoading = false;

  companyId!: string;

  empDataLocal: Employee | undefined;

  empList: Employee[] | undefined;

  empData: Employee | undefined;

  constructor(
    private service: DataService,
    private baseDataService: BaseDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
    if (this.empDataLocal) {
      console.log('run 1');
      this.companyId = this.empDataLocal.staffCode;
      this.loadUserById(this.companyId);
      // this.getUserById(this.companyId);
      // console.log(this.companyId);
    }
  }

  // getUserById = (id: string) => {
  //   console.log('run 2');
  //   this.isLoading = true;
  //   this.baseDataService.getEmployeById(id).subscribe((data) => {
  //     console.log(data);
  //     this.empList = data?.employees || [];
  //     console.log(this.empList);
  //   });
  //   this.isLoading = false;
  // };

  deleteCompany = () => {
    const companyId = this.empDataLocal?.companyID;
    if (companyId) {
      notify(
        {
          message: `Deleting company with ID ${companyId}...`,
          position: { at: 'top center', my: 'top center' },
        },
        'warning'
      );
      let countdown = 3;
      const countdownInterval = setInterval(() => {
        notify(
          {
            message: `Redirecting in ${countdown} seconds...`,
            position: { at: 'top center', my: 'top center' },
          },
          'warning'
        );

        countdown--;
        if (countdown < 0) {
          clearInterval(countdownInterval);
          this.baseDataService.deleteCompany(companyId).subscribe({
            next: (response) => {
              notify(
                {
                  message: `Company with ID ${companyId} deleted successfully.`,
                  position: { at: 'top center', my: 'top center' },
                },
                'success'
              );
              this.router.navigate(['/company-list']);
            },
            error: (err) => {
              notify(
                {
                  message: `Failed to delete company with ID ${companyId}. Please try again.`,
                  position: { at: 'top center', my: 'top center' },
                },
                'error'
              );
            },
          });
        }
      }, 1000);
    } else {
      console.error('companyDataLocal or companyID is undefined');
    }
  };

  loadUserById = (id: string) => {
    this.isLoading = true;
    const companyData = this.baseDataService.getCompanyData();
    if (companyData === undefined) {
      this.baseDataService.getEmployeById(id).subscribe((data) => {
        const transformedData = {
          ...data,
          image: this.baseDataService.generateRandomImage(),
        };
        this.empData = transformedData;
        this.isLoading = false;
      });
    } else {
      this.baseDataService.getEmployees().subscribe((companies) => {
        const companyById = companies.find((c) => c.staffCode == id);
        if (companyById) {
          this.baseDataService.setEmpData(companyById);
          this.empData = { ...companyById };
        }
        this.isLoading = false;
      });
    }
  };

  loadData = () => {
    // forkJoin([this.baseDataService.getCompanie(this.companyId)])
    //   .pipe(
    //     map(([listEmpl]) => ({
    //       listEmpl,
    //     }))
    //   )
    //   .subscribe((data) => {
    //     this.isLoading = false;
    //   });
    this.baseDataService.getEmpData().subscribe((data) => {
      this.empDataLocal = data;
    });
    this.service.getContact(this.contactId).subscribe((data) => {
      this.contactName = data.name;
      this.contactData = data;
      this.isLoading = false;
    });
  };

  refresh = () => {
    this.isLoading = true;
    this.loadData();
  };

  navigateToDetails = () => {
    this.router.navigate(['/emp-list']);
  };
}
