import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
  Input,
  SimpleChanges,
  OnInit,
  OnChanges,
} from '@angular/core';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxListModule } from 'devextreme-angular/ui/list';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { Activity } from '../../../types/activities';
import { CardMenuComponent } from '../card-menu/card-menu.component';

@Component({
  selector: 'card-activities',
  imports: [
    DxListModule,
    DxButtonModule,
    DxLoadPanelModule,
    CardMenuComponent,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './card-activities.component.html',
  styleUrls: ['./card-activities.component.scss'],
})
export class CardActivitiesComponent {
  @Input()
  activities: Activity[] | undefined;

  @Input() showBy? = false;

  @Input() isLoading: boolean = false;

  activityMenuItems: Array<{ text: string }> = [
    { text: 'View details' },
    { text: 'Delete' },
  ];
}
