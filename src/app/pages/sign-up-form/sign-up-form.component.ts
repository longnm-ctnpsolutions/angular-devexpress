import { Component } from '@angular/core';
import { CardAuthComponent, CreateAccountFormComponent } from '../../components';

@Component({
  selector: 'app-sign-up-form',
  imports: [
    CreateAccountFormComponent,
    CardAuthComponent,
  ],
  standalone: true,
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class AppSignUpComponent {

  defaultLink = '/sign-in-form';

  buttonLink = '/sign-up-form';

  constructor() { }
}
