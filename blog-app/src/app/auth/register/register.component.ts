import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.authService
      .register(this.firstName, this.lastName, this.email, this.password)
      .then(() => {
        console.log('User registered successfully');
      })
      .catch((error: any) => {
        console.error('Error registering user', error);
      });

    this.router.navigate(['/login']);
  }
}
