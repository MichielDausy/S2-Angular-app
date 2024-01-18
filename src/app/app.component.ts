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

  constructor(private router: Router) {
    // Subscribe to router events to determine the current route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Set isNavbarVisible based on the current route
        this.isNavbarVisible = !this.shouldShowNavbar(event.url);
      }
    });
  }

  // Function to determine if the navbar should be visible based on the current route
  private shouldShowNavbar(url: string): boolean {
    // Add logic to determine when the navbar should be visible
    // For example, you can check if the current route is one of the pages where the navbar should be visible
    return url.includes('/history');
  }
}
