import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../login-dialog/login-dialog';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isMobileMenuOpen = false;
  isLoggedIn = false; // For now, assume user is not logged in

  constructor(private dialog: MatDialog) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  onLogin(): void {
    const dialogRef = this.dialog.open(LoginDialog, {
      width: '450px',
      maxWidth: '90vw',
      disableClose: false,
      autoFocus: true,
      data: { mode: 'login' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        console.log('Login/Registration successful:', result.data);
        // TODO: Handle successful login/registration
        // For now, we'll simulate a successful login
        this.isLoggedIn = true;
      } else {
        console.log('Login/Registration cancelled');
      }
    });

    this.closeMobileMenu();
  }

  onLogout(): void {
    // TODO: Implement logout logic later
    console.log('Logout clicked');
    this.isLoggedIn = false;
    this.closeMobileMenu();
  }

  // Temporary method for testing - you can remove this later
  toggleLoginState(): void {
    this.isLoggedIn = !this.isLoggedIn;
    console.log('Login state toggled to:', this.isLoggedIn);
  }
}
