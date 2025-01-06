import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  NgModule,
  Output,
  Input,
  SimpleChanges,
  EventEmitter,
  AfterViewChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  DxAccordionModule,
  DxButtonModule,
  DxDropDownButtonModule,
  DxToolbarModule,
  DxLoadPanelModule,
  DxScrollViewModule,
  DxFormModule,
  DxValidatorModule,
  DxValidationGroupModule,
} from 'devextreme-angular';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { ScreenService } from '../../../services';
import { FormTextboxComponent } from '../../utils/form-textbox/form-textbox.component';
import { FormPhotoComponent } from '../../utils/form-photo/form-photo.component';
import { ContactStatusComponent } from '../../utils/contact-status/contact-status.component';
import { BaseDataService } from '../../../services/base-data.service';
import { Company, CompanyBase } from '../../../types/company';
import { ChangeDetectorRef } from '@angular/core';
import { get, omit } from 'lodash';
import notify from 'devextreme/ui/notify';
import { DataSource } from 'devextreme/common/data';
import { Employee } from '../../../types/employee';
@Component({
  selector: 'emp-panel',
  imports: [
    DxAccordionModule,
    DxButtonModule,
    DxDropDownButtonModule,
    DxToolbarModule,
    DxLoadPanelModule,
    DxScrollViewModule,
    DxFormModule,
    DxValidatorModule,
    DxValidationGroupModule,

    FormTextboxComponent,
    FormPhotoComponent,
    ContactStatusComponent,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './emp-panel.component.html',
  styleUrls: ['./emp-panel.component.scss'],
  providers: [BaseDataService],
})
export class EmpPanelComponent
  implements OnInit, OnChanges, AfterViewChecked, OnDestroy
{
  @Input() isOpened = false;

  @Input() userId: number | null = null;

  @Output() isOpenedChange = new EventEmitter<boolean>();

  @Output() pinnedChange = new EventEmitter<boolean>();
  @Output() companyUpdated = new EventEmitter<void>();
  private pinEventSubject = new Subject<boolean>();

  formData!: Employee;
  contactData!: Employee;
  companyData!: Employee;
  newEdit!: Employee;

  image!: string;

  pinned = false;

  isLoading = true;

  isEditing = false;

  isPinEnabled = false;

  userPanelSubscriptions: Subscription[] = [];

  constructor(
    private screen: ScreenService,
    private service: BaseDataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.userPanelSubscriptions.push(
      this.screen.changed.subscribe(this.calculatePin),
      this.pinEventSubject
        .pipe(distinctUntilChanged())
        .subscribe(this.pinnedChange)
    );
  }

  ngOnInit(): void {
    this.calculatePin();
  }

  ngAfterViewChecked(): void {
    this.pinEventSubject.next(this.pinned);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { userId } = changes;
    if (userId?.currentValue) {
      this.loadUserById(userId.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.userPanelSubscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadUserById = (id: string) => {
    this.isLoading = true;
    this.service.getEmployeById(id).subscribe((data) => {
      const transformedData = {
        ...data,
        staffCode: data.staffCode.toString(),
        phone: this.formatPhone(data.phone),
        image: this.service.generateRandomImage(),
      };
      this.formData = transformedData;
      this.contactData = { ...this.formData };
      this.service.setEmpData(this.contactData);
      this.isLoading = false;
      this.isEditing = false;
      this.cdr.detectChanges();
    });
  };
  formatPhone(phone: string): string {
    if (phone.startsWith('0')) {
      const formattedNumber = phone
        .substring(1)
        .replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
      return `(+84) ${formattedNumber}`;
    }
    return phone;
  }

  onClosePanel = () => {
    this.isOpened = false;
    this.pinned = false;
    this.isOpenedChange.emit(this.isOpened);
  };

  onPinClick = () => {
    this.pinned = !this.pinned;
  };

  onSaveClick = ({ validationGroup }: DxButtonTypes.ClickEvent) => {
    if (!validationGroup.validate().isValid) return;
    // this.contactData = { ...this.formData };
    // const id: number = get(this.contactData, 'companyID');
    // const newCompany: CompanyBase = omit(this.contactData, 'image', 'status');
    // this.service.updateCompanyPanel(newCompany, id).subscribe({
    //   next: (response) => {
    //     notify(
    //       {
    //         message: `Company "${newCompany.companyName}" saved`,
    //         position: { at: 'top center', my: 'top   center' },
    //       },
    //       'success'
    //     );
    //     this.companyUpdated.emit();
    //     return response;
    //   },
    //   error: (err) => {
    //     notify(
    //       {
    //         message: `Some things went wrong`,
    //         position: { at: 'top center', my: 'top   center' },
    //       },
    //       'error'
    //     );
    //   },
    // });
    // this.isEditing = !this.isEditing;
  };

  calculatePin = () => {
    this.isPinEnabled =
      this.screen.sizes['screen-large'] || this.screen.sizes['screen-medium'];
    if (this.pinned && !this.isPinEnabled) {
      this.pinned = false;
    }
  };

  toggleEdit = () => {
    this.isEditing = !this.isEditing;
  };

  cancelHandler() {
    this.toggleEdit();
    this.formData = { ...this.contactData };
  }

  navigateToDetails = () => {
    this.router.navigate(['/emp-details']);
  };
}
