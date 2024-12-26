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
        path: '**',
        redirectTo: 'crm-contact-list',
        pathMatch: 'full',
      },
    ],
  },
];

export const appRouterProviders = [
  provideRouter(routes, withHashLocation()),
  AuthGuardService,
];
