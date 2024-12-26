import { Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'user-avatar',
  standalone: true,
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input()
  dataLetters!: string | null;
}
