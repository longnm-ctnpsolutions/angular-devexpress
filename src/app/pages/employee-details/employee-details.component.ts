import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxDropDownButtonModule,
  DxScrollViewModule,
} from 'devextreme-angular';
import { forkJoin, map } from 'rxjs';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import {
  CardActivitiesComponent,
  CardMessagesComponent,
  CardNotesComponent,
  ContactCardsComponent,
  ContactFormComponent,
  ContactNewFormComponent,
} from '../../components';
import { DataService } from '../../services';
import { Contact, Messages, Notes, Opportunities } from '../../types';

@Component({
  templateUrl: './employee-details.component.html',
  imports: [
    DxButtonModule,
    DxDropDownButtonModule,
    DxScrollViewModule,
    DxToolbarModule,

    ContactFormComponent,
    ContactCardsComponent,

    CardActivitiesComponent,
    CardNotesComponent,
    CardMessagesComponent,
    CommonModule,
  ],
  standalone: true,
  styleUrls: ['./employee-details.component.scss'],
  providers: [DataService],
})
export class EmployeeDetailsComponent implements OnInit {
  contactId = 12;

  contactData: Contact | undefined;

  contactNotes: Notes = [];

  contactMessages: Messages = [];

  activeOpportunities: Opportunities = [];

  closedOpportunities: Opportunities = [];

  contactName = 'Loading...';

  isLoading = false;

  constructor(private service: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

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
