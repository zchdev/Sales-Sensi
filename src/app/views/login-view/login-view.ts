import { Component, inject } from '@angular/core';
import { FormsModule, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'app-login-view',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-view.html',
  styleUrl: './login-view.css',
})
export class LoginView {
  error: boolean = false;
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  form = this.fb.nonNullable.group({
    email: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)],
    ],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/app');
      },
      error: () => {
        this.error = true;
        console.error('Email/Password Sign-In error:');
      },
    });
  }

  guestLogin(): void {
    const values = { email: 'guest@mail.com', password: 'fake_password' };
    this.form.patchValue(values);
    const subscription = this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        subscription.unsubscribe();
        this.onSubmit();
      }
    });
  }
}
