import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-navigation',
  imports: [NgIf, NgClass, RouterModule],
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss'],
})
export class SidebarNavigationComponent {
  private router = inject(Router);
  isCollapsed = false;
  isLoggedIn = false;
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
  }

  signOut(): void {
    this.router.navigate(['/']);
  }
}
