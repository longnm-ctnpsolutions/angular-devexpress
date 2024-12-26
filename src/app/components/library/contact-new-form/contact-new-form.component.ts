import {
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxTextBoxModule,
  DxFormModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { FormTextboxComponent } from '../../utils/form-textbox/form-textbox.component';
import { newContact } from '../../../types/contact';
import { getSizeQualifier } from '../../../services';
import { FormPhotoUploaderComponent } from '../../utils/form-photo-uploader/form-photo-uploader.component';

@Component({
  selector: 'contact-new-form',
    imports: [
    DxTextBoxModule,
    DxFormModule,
    DxValidatorModule,

    FormTextboxComponent,
    FormPhotoUploaderComponent,

    CommonModule,
  ],
  standalone: true,
  templateUrl: './contact-new-form.component.html',
  providers: [],
})

export class ContactNewFormComponent {
  newUser = newContact;
  getSizeQualifier = getSizeQualifier;
  constructor() { }

  getNewContactData = ()=> ({ ...this.newUser })
}
