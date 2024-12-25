import { Component, NgModule } from '@angular/core';
import { CardAuthComponent, ResetPasswordFormComponent } from '../../components';

@Component({
    imports: [
    CardAuthComponent,
    ResetPasswordFormComponent,
  ],
  standalone: true,
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class AppResetPasswordComponent {

  defaultLink = '/sign-in-form';

  buttonLink = '/reset-password-form';

  constructor() { }

}

