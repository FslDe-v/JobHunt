import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.sercice';

@Component({
  selector: 'app-sidebar-navigation',
  imports: [NgIf, NgClass, RouterModule],
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss'],
})
export class SidebarNavigationComponent {
  private router = inject(Router);
  authService = inject(AuthService);
  isCollapsed = false;
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  showUserDropdown = false;

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) {
      this.showUserDropdown = false;
    }
  }

  toggleUserDropdown(): void {
    if (this.isCollapsed) {
      this.isCollapsed = false;
      this.showUserDropdown = true;
    } else {
      this.showUserDropdown = !this.showUserDropdown;
    }
  }

  signUp(): void {
    this.router.navigate(['/auth/signup']);
  }

  signIn(): void {
    this.router.navigate(['/auth/signin']);
    console.log(this.authService.isLoggedIn());
  }

  signOut(): void {
    this.router.navigate(['/']);
    this.authService.currentUser.set(null);
  }
}
