import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent ,CardAuthComponent} from '../../components';


@Component({
  selector: 'app-sign-in-form',
    imports: [
    CommonModule,
    LoginFormComponent,
    CardAuthComponent,
  ],
  standalone: true,
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class AppSignInComponent {
  constructor() { }
}
