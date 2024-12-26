import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxTabPanelModule,
  DxDataGridModule,
} from 'devextreme-angular';
import { Activity, Messages, Notes, Opportunities, Task } from '../../../types';
import { CardActivitiesComponent } from '../../library/card-activities/card-activities.component';
import { CardOpportunitiesComponent } from '../card-opportunities/card-opportunities.component';
import { CardTasksComponent } from '../card-tasks/card-tasks.component';
import { CardMessagesComponent } from '../card-messages/card-messages.component';
import { CardNotesComponent } from '../card-notes/card-notes.component';

@Component({
  selector: 'contact-cards',
  imports: [
    DxButtonModule,
    DxTabPanelModule,
    DxDataGridModule,

    CardNotesComponent,
    CardMessagesComponent,
    CardActivitiesComponent,
    CardOpportunitiesComponent,
    CardTasksComponent,

    CommonModule,
  ],
  standalone: true,
  templateUrl: './contact-cards.component.html',
  styleUrls: ['./contact-cards.component.scss'],
})
export class ContactCardsComponent {
  @Input() tasks: Task[] | undefined;

  @Input() activities: Activity[] | undefined;

  @Input() activeOpportunities: Opportunities = [];

  @Input() closedOpportunities: Opportunities = [];

  @Input() notes: Notes = [];

  @Input() messages: Messages = [];

  @Input()
  contactName!: string;

  @Input()
  isLoading!: boolean;
}
