import { Component, NgModule, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxListModule, DxListTypes } from 'devextreme-angular/ui/list';
import { IUser } from '../../../services';

@Component({
  selector: 'user-menu-section',
  standalone: true,
   imports: [
    DxListModule,
    CommonModule,
  ],
  templateUrl: 'user-menu-section.component.html',
  styleUrls: ['./user-menu-section.component.scss'],
})

export class UserMenuSectionComponent {
  @Input()
  menuItems: any;

  @Input()
  showAvatar!: boolean;

  @Input()
  user!: IUser | null;

  @ViewChild('userInfoList', { read: ElementRef }) userInfoList!: ElementRef<HTMLElement>;

  constructor() {}

  handleListItemClick(e: DxListTypes.ItemClickEvent) {
    e.itemData?.onClick();
  }
}

