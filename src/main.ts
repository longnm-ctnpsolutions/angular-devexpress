import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import themes from 'devextreme/ui/themes';


themes.initialized(() => {
  bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  });
