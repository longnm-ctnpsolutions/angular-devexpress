import { provideRouter, Routes, withHashLocation } from '@angular/router';
import { AuthGuardService } from './services/auth.service';
import {
  SideNavOuterToolbarComponent,
  UnauthenticatedContentComponent,
} from './layouts';
import {
  CreateAccountFormComponent,
  ResetPasswordFormComponent,
  LoginFormComponent,
  ChangePasswordFormComponent,
} from './components';
import { AppSignUpComponent } from './pages/sign-up-form/sign-up-form.component';
import { AppSignInComponent } from './pages/sign-in-form/sign-in-form.component';
import { AppResetPasswordComponent } from './pages/reset-password-form/reset-password-form.component';
import { CrmContactListComponent } from './pages/crm-contact-list/crm-contact-list.component';
import { CrmContactDetailsComponent } from './pages/crm-contact-details/crm-contact-details.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './pages/employee-details-1/employee-details.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { CompanyDetailsComponent } from './pages/company-details/company-details.component';
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { DepartmentDetailsComponent } from './pages/department-details/department-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: UnauthenticatedContentComponent,
    children: [
      {
        path: 'login',
        component: LoginFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'reset-password',
        component: ResetPasswordFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'create-account',
        component: CreateAccountFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'change-password/:recoveryCode',
        component: ChangePasswordFormComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    component: SideNavOuterToolbarComponent,
    children: [
      //Company
      {
        path: 'company-list',
        component: CompanyListComponent,
        canActivate: [AuthGuardService],
        data: { roles: [] },
      },
      {
        path: 'company-details',
        component: CompanyDetailsComponent,
        canActivate: [AuthGuardService],
        data: { roles: [] },
      },

      //Employee
      {
        path: 'employee-list',
        component: EmployeeListComponent,
        canActivate: [AuthGuardService],
        data: { roles: [] },
      },
      {
        path: 'employee-details',
        component: EmployeeDetailsComponent,
        canActivate: [AuthGuardService],
        data: { roles: [] },
      },

      // //Department
      // {
      //   path: 'department-list',
      //   component: DepartmentListComponent,
      //   canActivate: [AuthGuardService],
      //   data: { roles: [] },
      // },
      // {
      //   path: 'department-details',
      //   component: DepartmentDetailsComponent,
      //   canActivate: [AuthGuardService],
      //   data: { roles: [] },
      // },

      {
        path: 'crm-contact-list',
        component: CrmContactListComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'crm-contact-details',
        component: CrmContactDetailsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'sign-in-form',
        component: AppSignInComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'sign-up-form',
        component: AppSignUpComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'reset-password-form',
        component: AppResetPasswordComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: '',
        redirectTo: 'company-list',
        pathMatch: 'full',
      },

      // 404 Not Found
      {
        path: '**',
        component: NotFoundComponent,
        pathMatch: 'full',
      },
    ],
  },
];

export const appRouterProviders = [
  provideRouter(routes, withHashLocation()),
  AuthGuardService,
];
