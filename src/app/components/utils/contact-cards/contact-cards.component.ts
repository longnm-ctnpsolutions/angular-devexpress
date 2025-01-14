import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxTabPanelModule,
  DxDataGridModule,
} from 'devextreme-angular';
import { Task } from '../../../types';
import { CardTasksComponent } from '../card-tasks/card-tasks.component';
import { Employee } from '../../../types/employee';

@Component({
  selector: 'contact-cards',
  imports: [
    DxButtonModule,
    DxTabPanelModule,
    DxDataGridModule,

    CardTasksComponent,

    CommonModule,
  ],
  standalone: true,
  templateUrl: './contact-cards.component.html',
  styleUrls: ['./contact-cards.component.scss'],
})
export class ContactCardsComponent {
  @Input() tasks: Task[] | undefined;

  @Input() empList: Employee[] | undefined;

  @Input()
  contactName!: string;

  @Input()
  isLoading!: boolean;
}
