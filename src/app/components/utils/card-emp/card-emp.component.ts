import {
  Component,
  Input,
  NgModule,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { Employee } from '../../../types/employee';
import { EmpPanelComponent } from '../../library/emp-panel/emp-panel.component';
import { BaseDataService } from '../../../services/base-data.service';
import { DataSource } from 'devextreme/common/data';

@Component({
  selector: 'card-emp',
  imports: [
    DxDataGridModule,
    DxLoadPanelModule,
    CommonModule,
    EmpPanelComponent,
  ],
  standalone: true,
  templateUrl: './card-emp.component.html',
  styleUrls: ['./card-emp.component.scss'],
})
export class CardEmpsComponent implements OnChanges {
  @ViewChild('dataGrid', { static: false }) component!: DxDataGridComponent;
  @Input() empList: Employee[] | undefined;
  @Input() companyID: number | undefined;

  @Input() isLoading: boolean = false;

  currentTasks!: Employee[];
  isPanelOpened = false;
  staffCode: number | null = null;

  constructor(private service: BaseDataService) {
    this.onReorder = this.onReorder.bind(this);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['empList']?.currentValue) {
      this.currentTasks = changes['empList'].currentValue;
      console.log(this.currentTasks);
    }
  }
  dataSource = new DataSource<Employee[], string>({
    key: 'staffCode',
    load: async () => {
      return this.currentTasks;
    },
  });

  onReorder(e: DxDataGridTypes.RowDraggingReorderEvent) {
    const visibleRows = e.component.getVisibleRows();
    const toIndex = this.currentTasks.indexOf(visibleRows[e.toIndex].data);
    const fromIndex = this.currentTasks.indexOf(e.itemData);

    this.currentTasks.splice(fromIndex, 1);
    this.currentTasks.splice(toIndex, 0, e.itemData);
  }

  rowClick(e: DxDataGridTypes.RowClickEvent) {
    const { data } = e;
    this.staffCode = data.staffCode;
    this.isPanelOpened = true;
  }

  onOpenedChange = (value: boolean) => {
    if (!value) {
      this.staffCode = null;
    }
  };

  onPinnedChange = () => {
    this.component.instance.updateDimensions();
  };
}
