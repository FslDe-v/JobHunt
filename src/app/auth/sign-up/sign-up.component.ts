import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth.sercice';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  navigateToHome() {
    this.router.navigate(['']);
  }

  navigateToSignIn() {
    this.router.navigate(['/auth/signin']);
  }

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  get emailAlreadyTaken() {
    return this.form.controls.email.hasError('emailTaken');
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
      const formValue = this.form.value;
      const name: string = formValue.name || '';
      const email: string = formValue.email || '';
      const password: string = formValue.password || '';
      this.authService.signUp(email, name, password).subscribe(() => {
        this.router.navigate(['/home']);
      });
    } else {
      console.error('Form is invalid.');
    }
  }
}
