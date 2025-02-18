import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.sercice';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  errorMessage: string | null = null;

  navigateToSignUp() {
    this.router.navigate(['/auth/signup']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  get credentialsInvalid() {
    return this.form.hasError('invalidCredentials');
  }

  async onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      const formValue = this.form.value;
      const email: string = formValue.email || '';
      const password: string = formValue.password || '';
      this.authService.signIn(email, password).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: () => {
          this.errorMessage = 'Invalid email or password.';
        },
      });
    } else {
      console.log('Form Submitted:', this.form.value);
      this.errorMessage = 'Invalid email or password.';
    }
  }
}
