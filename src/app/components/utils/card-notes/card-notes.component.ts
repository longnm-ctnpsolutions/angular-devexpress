import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import {
  DxTextAreaModule,
  DxToolbarModule,
  DxButtonModule,
  DxValidationGroupModule,
  DxValidatorModule,
  DxScrollViewModule,
} from 'devextreme-angular';
import { Note, Notes } from '../../../types';

@Component({
  selector: 'card-notes',
  imports: [
    DxTextAreaModule,
    DxToolbarModule,
    DxButtonModule,
    DxValidationGroupModule,
    DxValidatorModule,
    DxScrollViewModule,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './card-notes.component.html',
  styleUrls: ['./card-notes.component.scss'],
})
export class CardNotesComponent {
  @Input() user!: string;

  @Input() items!: Notes;

  nodeText = '';

  add = (e: {
    validationGroup: {
      validate: () => { (): any; new (): any; isValid: any };
      reset: () => void;
    };
  }) => {
    if (!e.validationGroup.validate().isValid) {
      return;
    }

    const newNote: Note = {
      manager: this.user,
      date: new Date(),
      text: this.nodeText,
    };

    this.items.push(newNote);

    e.validationGroup.reset();
  };
}
