import { Component, HostBinding, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppInfoService, AuthService, ScreenService, ThemeService } from './services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl:'./app.component.scss'
})
export class AppComponent implements OnDestroy {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter((cl) => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthService,
              private themeService: ThemeService,
              private screen: ScreenService,
              public appInfo: AppInfoService) {
    themeService.setAppTheme();
  }

  isAuthenticated() {
    return this.authService.loggedIn;
  }

  ngOnDestroy(): void {
    this.screen.breakpointSubscription.unsubscribe();
  }
}

