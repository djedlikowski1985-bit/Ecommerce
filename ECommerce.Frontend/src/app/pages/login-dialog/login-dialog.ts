import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  standalone: false,
  templateUrl: './login-dialog.html',
  styleUrl: './login-dialog.css'
})
export class LoginDialog {
  loginForm: FormGroup;
  isRegistering = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
      firstName: [''],
      lastName: [''],
      rememberMe: [false]
    });
  }

  toggleMode(): void {
    this.isRegistering = !this.isRegistering;
    
    if (this.isRegistering) {
      // Add validators for registration fields
      this.loginForm.get('confirmPassword')?.setValidators([
        Validators.required,
        this.passwordMatchValidator.bind(this)
      ]);
      this.loginForm.get('firstName')?.setValidators([Validators.required]);
      this.loginForm.get('lastName')?.setValidators([Validators.required]);
    } else {
      // Remove validators for login mode
      this.loginForm.get('confirmPassword')?.clearValidators();
      this.loginForm.get('firstName')?.clearValidators();
      this.loginForm.get('lastName')?.clearValidators();
    }
    
    // Update form validation
    this.loginForm.get('confirmPassword')?.updateValueAndValidity();
    this.loginForm.get('firstName')?.updateValueAndValidity();
    this.loginForm.get('lastName')?.updateValueAndValidity();
  }

  passwordMatchValidator(control: any) {
    const password = this.loginForm?.get('password')?.value;
    const confirmPassword = control.value;
    
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      
      if (this.isRegistering) {
        console.log('Registration data:', formData);
        // TODO: Implement registration logic
      } else {
        console.log('Login data:', formData);
        // TODO: Implement login logic
      }
      
      // Close dialog and return success
      this.dialogRef.close({ success: true, data: formData });
    } else {
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close({ success: false });
  }

  // Helper methods for template
  getEmailErrorMessage(): string {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email is required';
    }
    if (emailControl?.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'Password is required';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }

  getConfirmPasswordErrorMessage(): string {
    const confirmPasswordControl = this.loginForm.get('confirmPassword');
    if (confirmPasswordControl?.hasError('required')) {
      return 'Please confirm your password';
    }
    if (confirmPasswordControl?.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }
    return '';
  }
}