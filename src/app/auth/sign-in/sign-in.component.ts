import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  private router = inject(Router);

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
      this.router.navigate(['/home']);
    } else {
      console.log('Form Submitted:', this.form.value);
      console.error('Invalid email or password.');
    }
  }
}
