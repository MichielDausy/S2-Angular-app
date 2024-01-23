import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TrainDashboard';

  isNavbarVisible: boolean = false;
  isFooterVisible: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isNavbarVisible = !this.shouldShowNavbar(event.url);
        this.isFooterVisible = !this.shouldShowFooter(event.url);
      }
    });
  }

  private shouldShowNavbar(url: string): boolean {
    return url.includes('/history') || url.includes('/anomaly/map') || url.includes('/anomaly/list') ;
  }
  private shouldShowFooter(url: string): boolean {
    return url.includes('/anomaly/map');
  }
}
