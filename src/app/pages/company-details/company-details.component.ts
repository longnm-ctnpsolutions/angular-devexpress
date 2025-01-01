import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxScrollViewModule,
} from 'devextreme-angular';
import { forkJoin, map } from 'rxjs';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import {
  // CardActivitiesComponent,
  // CardMessagesComponent,
  // CardNotesComponent,
  ContactCardsComponent,
  ContactFormComponent,
} from '../../components';
import { DataService } from '../../services';
import { Contact, Messages, Notes, Opportunities } from '../../types';
import { BaseDataService } from '../../services/base-data.service';
import { Company } from '../../types/company';
import { CompanyFormComponent } from '../../components/library/company-form/company-form.component';

@Component({
  templateUrl: './company-details.component.html',
  imports: [
    DxButtonModule,
    DxDropDownButtonModule,
    DxScrollViewModule,
    DxToolbarModule,
    CompanyFormComponent,
    ContactCardsComponent,
    // CardActivitiesComponent,
    // CardNotesComponent,
    // CardMessagesComponent,
    CommonModule,
    CompanyFormComponent,
  ],
  standalone: true,
  styleUrls: ['./company-details.component.scss'],
  providers: [DataService, BaseDataService],
})
export class CompanyDetailsComponent implements OnInit {
  contactId = 12;

  contactData: Contact | undefined;

  contactNotes: Notes = [];

  contactMessages: Messages = [];

  activeOpportunities: Opportunities = [];

  closedOpportunities: Opportunities = [];

  contactName = 'Loading...';

  isLoading = false;

  companyDataLocal: Company | undefined;

  companyData: Company | undefined;
  transformedData: Company | undefined;
  constructor(
    private service: DataService,
    private baseDataService: BaseDataService
  ) {}

  ngOnInit(): void {
    this.loadData();
    if (this.companyDataLocal) {
      const companyId = this.companyDataLocal.companyID;
      this.loadUserById(companyId);
    }
  }

  loadUserById = (id: number) => {
    this.isLoading = true;
    const companyById = this.baseDataService
      .getCompanyList()
      .find((company) => company.companyID === id);
    if (companyById) {
      const transformedData = {
        ...companyById,
        status: companyById.isActive ? 'Active' : 'InActive',
      };
      return (this.companyData = transformedData);
    } else {
      this.baseDataService.getCompanie(id).subscribe((data) => {
        const transformedData = {
          ...data,
          status: data.isActive ? 'Active' : 'InActive',
          image: this.baseDataService.generateRandomImage(),
        };
        return transformedData;
      });
    }
    return (this.companyData = this.transformedData);
  };

  loadData = () => {
    forkJoin([
      this.service.getContactNotes(this.contactId),
      this.service.getContactMessages(this.contactId),
      this.service.getActiveContactOpportunities(this.contactId),
      this.service.getClosedContactOpportunities(this.contactId),
    ])
      .pipe(
        map(
          ([
            contactNotes,
            contactMessages,
            activeOpportunities,
            closedOpportunities,
          ]) => ({
            contactNotes,
            contactMessages,
            activeOpportunities,
            closedOpportunities,
          })
        )
      )
      .subscribe((data) => {
        this.contactNotes = data.contactNotes;
        this.contactMessages = data.contactMessages;
        this.activeOpportunities = data.activeOpportunities;
        this.closedOpportunities = data.closedOpportunities;
        this.isLoading = false;
      });
    this.baseDataService.getCompanyData().subscribe((data) => {
      this.companyDataLocal = data;
      console.log('Company Data on init:', this.companyDataLocal);
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
}
