import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import notify from 'devextreme/ui/notify';
import { Opportunity } from '../../../types';

@Component({
  selector: 'opportunity-tile',
  imports: [CommonModule],
  standalone: true,
  templateUrl: 'opportunity-tile.component.html',
  styleUrls: ['./opportunity-tile.component.scss'],
})
export class OpportunityTileComponent {
  @Input() data!: Opportunity;

  opportunityClick() {
    notify('Click opportunity event');
  }
}
