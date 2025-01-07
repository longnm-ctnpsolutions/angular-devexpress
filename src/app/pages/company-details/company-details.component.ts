import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxScrollViewModule,
} from 'devextreme-angular';
import { forkJoin, map } from 'rxjs';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DataService } from '../../services';
import { Contact } from '../../types';
import { BaseDataService } from '../../services/base-data.service';
import { Company } from '../../types/company';
import { CompanyFormComponent } from '../../components/library/company-form/company-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { Employee } from '../../types/employee';
import { CompanyCardsComponent } from '../../components/utils/company-cards/company-cards.component';
import { FormPopupComponent } from '../../components/utils/form-popup/form-popup.component';
import { DeleteFormComponent } from '../../components/library/delete-form/delete-form.component';

@Component({
  templateUrl: './company-details.component.html',
  imports: [
    DxButtonModule,
    DxDropDownButtonModule,
    DxScrollViewModule,
    DxToolbarModule,
    CompanyFormComponent,
    CommonModule,
    CompanyFormComponent,
    CompanyCardsComponent,
    FormPopupComponent,
    DeleteFormComponent,
  ],
  standalone: true,
  styleUrls: ['./company-details.component.scss'],
  providers: [DataService, BaseDataService],
})
export class CompanyDetailsComponent implements OnInit {
  contactId = 12;

  contactData: Contact | undefined;

  contactName = 'Loading...';

  isLoading = false;

  companyId!: number;

  companyDataLocal: Company | undefined;

  empList: Employee[] | undefined;

  companyData: Company | undefined;
  id!: number;
  isAddContactPopupOpened = false;
  constructor(
    private service: DataService,
    private baseDataService: BaseDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData();
    if (this.companyDataLocal) {
      console.log('run 1');
      this.companyId = this.companyDataLocal.companyID;
      this.route.paramMap.subscribe((params) => {
        const paramId = params.get('id')!;
        this.id = parseInt(paramId, 10);
      });

      this.loadUserById(this.id);
      this.getUserById(this.id);
    }
  }

  getUserById = (id: number) => {
    console.log('run 2');
    this.isLoading = true;
    this.baseDataService.getCompanie(id).subscribe((data) => {
      console.log(data);
      this.empList = data?.employees || [];
      console.log(this.empList);
    });
    this.isLoading = false;
  };

  deleteCompany = () => {
    const companyId = this.companyDataLocal?.companyID;
    const name = this.companyDataLocal?.companyName;
    if (companyId) {
      notify(
        {
          message: `Deleting company: ${name}...`,
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

  loadUserById = (id: number) => {
    this.isLoading = true;
    const companyData = this.baseDataService.getCompanyData();
    if (companyData === undefined) {
      this.baseDataService.getCompanie(id).subscribe((data) => {
        const transformedData = {
          ...data,
          image: this.baseDataService.generateRandomImage(),
        };
        this.companyData = transformedData;
        this.isLoading = false;
      });
    } else {
      this.baseDataService.getCompanies().subscribe((companies) => {
        const companyById = companies.find((c) => c.companyID == id);
        if (companyById) {
          this.baseDataService.setCompanyData(companyById);
          this.companyData = { ...companyById };
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
    this.baseDataService.getCompanyData().subscribe((data) => {
      this.companyDataLocal = data;
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
    this.router.navigate(['/company-list']);
  };
  addContact() {
    this.isAddContactPopupOpened = true;
  }
}
