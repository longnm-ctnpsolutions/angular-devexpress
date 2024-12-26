import { Component, Input, NgModule } from '@angular/core';
import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';

@Component({
  selector: 'card-menu',
   imports: [DxDropDownButtonModule],
   standalone: true,
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss']
})
export class CardMenuComponent {
  @Input()
  items!: Array<{ text: string; }>;
  @Input() visible = true;

  constructor() { }
}

