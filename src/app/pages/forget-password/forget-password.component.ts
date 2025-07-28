import { Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/Auth/auth.service';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

 private readonly _FormBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  stepNumber: number = 1;
  isLoading: boolean = false;
  resetEmail: string | null = null;
  resetToken: string | null = null;

  ForgetPassword = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  resetPasswordForm = this._FormBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, { validator: this.passwordMatchValidator });

  constructor() {
    this.resetEmail = this.route.snapshot.queryParamMap.get('email');
    this.resetToken = this.route.snapshot.queryParamMap.get('token');
    if (this.resetEmail && this.resetToken) {
      this.stepNumber = 2; 
    }
   
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  submitForgetPassword() {
    if (this.ForgetPassword.valid) {
      this.isLoading = true;
      const email = this.ForgetPassword.value.email as string;
      this.authService.forgotPassword(email).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.toastrService.success(res.message);
          if (res.resetLink) {
            const url = new URL(res.resetLink);
            this.resetEmail = url.searchParams.get('email');
            this.resetToken = decodeURIComponent(url.searchParams.get('token') || '');
            this.stepNumber = 2; 
         
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.toastrService.error('Failed to send reset link: ' + (err.error?.message || 'Please try again.'));
        }
      });
    }
  }

  submitResetPassword() {
    if (this.resetPasswordForm.valid && this.resetEmail && this.resetToken) {
      this.isLoading = true;
      const password = this.resetPasswordForm.get('password')?.value as string;
      this.authService.resetPassword(this.resetEmail, decodeURIComponent(this.resetToken), password).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.toastrService.success(res.message || 'Password reset successfully!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.toastrService.error('Failed to reset password: ' + (err.error?.message || 'Invalid token.'));
        }
      });
    } else {
      this.toastrService.error('Invalid reset link.');
    }
  }
}
