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
import { Company } from '../../../types/company';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'company-panel',
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
  templateUrl: './company-panel.component.html',
  styleUrls: ['./company-panel.component.scss'],
  providers: [BaseDataService],
})
export class CompanyPanelComponent
  implements OnInit, OnChanges, AfterViewChecked, OnDestroy
{
  @Input() isOpened = false;

  @Input() userId: number | null = null;

  @Output() isOpenedChange = new EventEmitter<boolean>();

  @Output() pinnedChange = new EventEmitter<boolean>();

  private pinEventSubject = new Subject<boolean>();

  formData!: Company;

  contactData!: Company;
  companyData!: Company;
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

  loadUserById = (id: number) => {
    this.isLoading = true;
    const companyData = this.service.getCompanyData();
    if (companyData === undefined) {
      this.service.getCompanie(id).subscribe((data) => {
        const transformedData = {
          ...data,
          status: data.isActive ? 'Active' : 'InActive',
          image: this.service.generateRandomImage(),
        };
        this.formData = transformedData;
        this.contactData = { ...this.formData };
        this.isLoading = false;
        this.isEditing = false;
        this.cdr.detectChanges();
      });
    } else {
      const companyById = this.service
        .getCompanyList()
        .find((company) => company.companyID === id);
      if (companyById) {
        this.service.setCompanyData(companyById);
        this.formData = companyById;
        this.contactData = { ...this.formData };
      }
      this.isLoading = false;
      this.isEditing = false;
      this.cdr.detectChanges();
    }
  };

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
    this.contactData = { ...this.formData };
    this.isEditing = !this.isEditing;
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
    this.router.navigate(['/company-details']);
  };
}