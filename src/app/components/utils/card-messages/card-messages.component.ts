import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import {
  DxTextAreaModule,
  DxTextBoxModule,
  DxButtonModule,
  DxToolbarModule,
  DxFileUploaderModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { Message, Messages } from '../../../types';
import { UserAvatarComponent } from '../../library/user-avatar/user-avatar.component';

@Component({
  selector: 'card-messages',
  imports: [
    DxTextAreaModule,
    DxTextBoxModule,
    DxToolbarModule,
    DxFileUploaderModule,
    DxButtonModule,
    DxValidationGroupModule,
    DxValidatorModule,
    UserAvatarComponent,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './card-messages.component.html',
  styleUrls: ['./card-messages.component.scss'],
})
export class CardMessagesComponent {
  @Input()
  user!: string;

  @Input()
  items!: Messages;

  messageTitle = '';

  messageText = '';

  getAvatarText(name: string) {
    return name
      .split(' ')
      .map((name) => name[0])
      .join('');
  }

  getText(data: Message) {
    return data.text.replace(
      '{username}',
      data.manager !== this.items[0].manager
        ? this.items[0].manager
        : this.items[1].manager
    );
  }

  send = (e: {
    validationGroup: {
      validate: () => { (): any; new (): any; isValid: any };
      reset: () => void;
    };
  }) => {
    if (!e.validationGroup.validate().isValid) {
      return;
    }

    const newMessage: Message = {
      subject: this.messageTitle,
      text: this.messageText,
      manager: this.user,
      date: new Date(),
    };

    this.items.push(newMessage);

    e.validationGroup.reset();
  };
}
