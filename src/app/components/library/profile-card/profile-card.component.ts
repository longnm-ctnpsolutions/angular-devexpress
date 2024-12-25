import {Component, EventEmitter, Input, NgModule, Output, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxButtonModule, DxDateBoxModule, DxFormComponent, DxFormModule, DxNumberBoxModule, DxSelectBoxModule,
  DxTextBoxModule, DxToolbarModule,
  DxValidatorModule,
  DxScrollViewModule
} from 'devextreme-angular';
import { getSizeQualifier, ScreenService } from '../../../services';
import { ApplyPipe } from '../../../pipes/apply.pipe';
// import { FormTextboxComponent } from '../../utils/form-textbox/form-textbox.component';
// import { FormPhotoComponent } from '../../utils/form-photo/form-photo.component';
import { StatusSelectBoxComponent } from '../status-select-box/status-select-box.component';
import { PicturedItemSelectBoxComponent } from '../pictured-item-select-box/pictured-item-select-box.component';

type CardData = Record<string, any>;

@Component({
  selector: 'profile-card',
  imports: [
    ApplyPipe,
    DxButtonModule,
    DxDateBoxModule,
    DxFormModule,
    DxNumberBoxModule,
    DxToolbarModule,
    DxSelectBoxModule,
    DxScrollViewModule,
    DxTextBoxModule,
    // FormTextboxComponent,
    // FormPhotoComponent,
    DxValidatorModule,
    CommonModule,
    PicturedItemSelectBoxComponent,
    StatusSelectBoxComponent,
  ],
  standalone:true,
  templateUrl: './profile-card.component.html',
  styleUrls: ['profile-card.component.scss'],
})
export class ProfileCardComponent {
  @ViewChild('form', { static: true }) form!: DxFormComponent;

  @Input() items: Record<string, any>[] = [];

  @Input() colCount: number = 2;

  @Input() title: string = '';

  @Output() dataChanged = new EventEmitter<any>();

  @Input() cardData!: CardData;

  getSizeQualifier = getSizeQualifier;

  assign = Object.assign;

  constructor(public screen: ScreenService) {}

  onFieldChange(fieldName?: string | number, value?: any) {
    const {isValid} = this.form.instance.validate();

    if (!isValid) {
      return;
    }

    if (fieldName) {
      this.cardData[fieldName] = value;
    }

    this.dataChanged.emit(this.cardData);
  }

  getFieldValue(cardData: { [x: string]: any; }, fieldName: string | number) {
    return cardData[fieldName];
  }
}
