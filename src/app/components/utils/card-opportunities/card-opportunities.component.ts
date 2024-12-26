import {
  Component,
  Input,
  NgModule,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonModule, DxLoadPanelModule } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { Opportunity } from '../../../types';
import { OpportunityTileComponent } from '../opportunity-tile/opportunity-tile.component';

@Component({
  selector: 'card-opportunities',
  imports: [
    DxButtonModule,
    DxLoadPanelModule,
    OpportunityTileComponent,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './card-opportunities.component.html',
  styleUrls: ['./card-opportunities.component.scss'],
})
export class CardOpportunitiesComponent implements OnChanges {
  @Input() openedOpportunities!: Opportunity[];

  @Input() closedOpportunities!: Opportunity[];

  isLoading = true;

  ngOnChanges(changes: SimpleChanges) {
    const isLoadActive = !changes['openedOpportunities']?.currentValue;
    const isLoadClosed = !changes['closedOpportunities']?.currentValue;

    this.isLoading = isLoadActive || isLoadClosed;
  }
}
