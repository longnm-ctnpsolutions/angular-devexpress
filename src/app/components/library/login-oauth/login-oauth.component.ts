import { Component } from '@angular/core';
import { DxButtonModule, DxButtonTypes } from 'devextreme-angular/ui/button';
import { ThemeService } from '../../../services';

@Component({
  selector: 'app-login-oauth',
  standalone: true,
   imports: [
    DxButtonModule
  ],
  templateUrl: './login-oauth.component.html',
  styleUrls: ['./login-oauth.component.scss']
})
export class LoginOauthComponent {
  btnStylingMode!: DxButtonTypes.ButtonStyle;

  constructor(private themeService: ThemeService) {
    this.themeService.isDark.subscribe((value: boolean) => {
      this.btnStylingMode = value ? 'outlined' : 'contained';
    });
  }
}
