import { provideRouter, Routes, withHashLocation } from '@angular/router';
import { AuthGuardService } from '../services/auth.service';
import { LoginFormComponent } from './components/library/login-form/login-form.component';
import { UnauthenticatedContentComponent } from './layouts';
// import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
// import { HomeComponent } from './pages/home/home.component';
// import { ProfileComponent } from './pages/profile/profile.component';
// import { TasksComponent } from './pages/tasks/tasks.component';
// import { ContactsComponent } from './pages/contacts/contacts.component';
// import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
// import { CompanyListComponent } from './pages/admin/company-list/company-list.component';
// import { CompanyDashboardComponent } from './pages/company/company-dashboard/company-dashboard.component';
// import { EmployeeListComponent } from './pages/company/employee-list/employee-list.component';
// import { DepartmentListComponent } from './pages/company/department-list/department-list.component';

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
      // {
      //   path: 'reset-password',
      //   component: ResetPasswordFormComponent,
      //   canActivate: [AuthGuardService],
      // },
      // {
      //   path: 'create-account',
      //   component: CreateAccountFormComponent,
      //   canActivate: [AuthGuardService],
      // },
      // {
      //   path: 'change-password/:recoveryCode',
      //   component: ChangePasswordFormComponent,
      //   canActivate: [AuthGuardService],
      // },
      // {
      //   path: '**',
      //   redirectTo: 'login',
      //   pathMatch: 'full',
      // },
    ]
  },
  {
    path: '',
    // component: SideNavOuterToolbarComponent,
    children: [
      // {
      //   path: 'crm-contact-list',
      //   component: CrmContactListComponent,
      //   canActivate: [AuthGuardService],
      // },
      // {
      //   path: 'crm-contact-details',
      //   component: CrmContactDetailsComponent,
      //   canActivate: [AuthGuardService],
      // },
      // {
      //   path: 'sign-in-form',
      //   component: AppSignInComponent,
      //   canActivate: [AuthGuardService],
      // },
      // {
      //   path: 'sign-up-form',
      //   component: AppSignUpComponent,
      //   canActivate: [AuthGuardService],
      // },
      // {
      //   path: 'reset-password-form',
      //   component: AppResetPasswordComponent,
      //   canActivate: [AuthGuardService],
      // },
      // {
      //   path: 'user-profile',
      //   component: UserProfileComponent
      // },
      {
        path: '**',
        redirectTo: 'crm-contact-list',
        pathMatch: 'full',
      },
    ]
  },
];

export const appRouterProviders = provideRouter(routes, withHashLocation());
