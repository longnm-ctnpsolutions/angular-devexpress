import {
  Component, Input, Output, EventEmitter, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { AuthService, IUser } from '../../../../services';
import { ThemeSwitcherComponent } from '../theme-switcher/theme-switcher.component';
import { UserPanelComponent } from '../user-panel/user-panel.component';

@Component({
  selector: 'app-header',
    imports: [
    CommonModule,
    DxButtonModule,
    DxToolbarModule,
    ThemeSwitcherComponent,
    UserPanelComponent,
  ],
  standalone: true,
  templateUrl: 'app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})

export class AppHeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  user: IUser | null = { email: '' };

  userMenuItems = [
  {
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
      this.authService.logOut();
    },
  }];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUser().then((e) => this.user = e.data);
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  };
}

