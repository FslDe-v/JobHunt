import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestAPIComponent } from './test-api/test-api.component';
import { SidebarNavigationComponent } from './sidbar-navigation/sidebar-navigation.component';
import { AuthService } from './auth.sercice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TestAPIComponent, SidebarNavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.authService.currentUser.set({
          email: user.email!,
          userName: user.displayName!,
        });
      } else {
        this.authService.currentUser.set(null);
      }
      console.log(this.authService.currentUser());
    });
  }
}
