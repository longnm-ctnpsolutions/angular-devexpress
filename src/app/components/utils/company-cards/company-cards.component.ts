import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule,
  DxTabPanelModule,
  DxDataGridModule,
} from 'devextreme-angular';
import { Employee } from '../../../types/employee';
import { CardEmpsComponent } from '../card-emp/card-emp.component';

@Component({
  selector: 'company-cards',
  imports: [
    DxButtonModule,
    DxTabPanelModule,
    DxDataGridModule,
    CommonModule,
    CardEmpsComponent,
  ],
  standalone: true,
  templateUrl: './company-cards.component.html',
  styleUrls: ['./company-cards.component.scss'],
})
export class CompanyCardsComponent {
  @Input() empList: Employee[] | undefined;

  @Input() companyID: number | undefined;

  @Input()
  contactName!: string;

  @Input()
  isLoading!: boolean;
}
