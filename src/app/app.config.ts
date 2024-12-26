import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { appRouterProviders } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { AppInfoService, AuthService, ScreenService, ThemeService } from './services';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    importProvidersFrom(DxDataGridModule, DxFormModule),
    appRouterProviders,
    AuthService,
    ScreenService,
    AppInfoService,
    ThemeService
  ]
};
