import { CommonModule } from '@angular/common';
import { Component, NgModule, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ValidationCallbackData } from 'devextreme-angular/common';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { LoginOauthComponent } from '../login-oauth/login-oauth.component';
import { AuthService, IResponse } from '../../../services';

@Component({
  selector: 'app-create-account-form',
    imports: [
    CommonModule,
    RouterModule,
    LoginOauthComponent,
    DxFormModule,
    DxLoadIndicatorModule,
  ],
  standalone:true,
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.scss'],
})
export class CreateAccountFormComponent implements OnInit {
  @Input() redirectLink = '/auth/login';
  @Input() buttonLink = '/auth/login';
  loading = false;

  defaultAuthData!: IResponse;

  formData: any = {};

  constructor(private authService: AuthService, private router: Router) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email, password } = this.formData;
    this.loading = true;

    const result = await this.authService.createAccount(email, password);
    this.loading = false;

    if (result.isOk) {
      this.router.navigate([this.buttonLink]);
    } else {
      notify(result.message, 'error', 2000);
    }
  }

  confirmPassword = (e: ValidationCallbackData) => e.value === this.formData.password;

  async ngOnInit(): Promise<void> {
    this.defaultAuthData = await this.authService.getUser();
  }
}

