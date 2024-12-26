import {
  Component, EventEmitter, Input, NgModule, Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
// import { ApplyPipe } from '../../../pipes/apply.pipe';

@Component({
  selector: 'pictured-item-select-box',
   imports: [
    // ApplyPipe,
    DxSelectBoxModule,
    DxTextBoxModule,
    CommonModule],
    standalone: true,
  templateUrl: 'pictured-item-select-box.component.html',
  styleUrls: ['./pictured-item-select-box.component.scss'],
})
export class PicturedItemSelectBoxComponent {
  @Input() value!: Record<string, unknown>;

  @Input() label = '';

  @Input() items: Record<string, unknown>[] = [];

  @Output() valueChange = new EventEmitter<string>();
}
