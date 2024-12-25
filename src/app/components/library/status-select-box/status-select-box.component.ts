import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { EditorStyle } from 'devextreme-angular/common';
import { ThemeService } from '../../../services';
import { contactStatusList } from '../../../types/contact';
import { ContactStatusComponent } from '../../utils/contact-status/contact-status.component';

@Component({
  selector: 'status-select-box',
  imports: [
    DxSelectBoxModule,
    DxTextBoxModule,
    ContactStatusComponent,
    CommonModule,
  ],
  standalone: true,
  templateUrl: 'status-select-box.component.html',
  styleUrls: ['./status-select-box.component.scss'],
})
export class StatusSelectBoxComponent {

  @Input() value!: string;

  @Input() label = '';

  @Input() items = contactStatusList;

  @Input() readOnly = false;

  @Input() stylingMode: EditorStyle = 'filled';

  // @Input() labelMode: any = this.theme.isFluent() ? 'outside' : undefined;

  @Input() labelMode: any;
  @Input() classList: any;

  @Output() valueChange = new EventEmitter<string>();

  constructor(private theme: ThemeService) {}

  ngOnInit(): void {
    // Initialize labelMode in ngOnInit instead of directly in the property declaration
    this.labelMode = this.theme.isFluent() ? 'outside' : undefined;
  }
}
