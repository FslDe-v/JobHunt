import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestAPIComponent } from './test-api/test-api.component';
import { SidebarNavigationComponent } from './sidbar-navigation/sidebar-navigation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TestAPIComponent, SidebarNavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'jobHunt-app';
}
