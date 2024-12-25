import { Component, NgModule, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxDropDownButtonModule } from 'devextreme-angular/ui/drop-down-button';
import { IUser } from '../../../services';
import { UserMenuSectionComponent } from '../user-menu-section/user-menu-section.component';
@Component({
  selector: 'user-panel',
    imports: [
    DxDropDownButtonModule,
    UserMenuSectionComponent,
    CommonModule,
  ],
  standalone: true,
  templateUrl: 'user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
})

export class UserPanelComponent {
  @Input()
  menuItems: any;

  @Input()
  menuMode!: string;

  @Input()
  user!: IUser | null;

  @ViewChild(UserMenuSectionComponent) userMenuSection!: UserMenuSectionComponent;

  constructor() {}

  handleDropDownButtonContentReady({ component }: any) {
    component.registerKeyHandler('downArrow', () => {
      this.userMenuSection.userInfoList.nativeElement.focus();
    });
  }
}
