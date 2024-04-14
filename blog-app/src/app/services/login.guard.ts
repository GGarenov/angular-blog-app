import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.authService
        .isLoggedIn()
        .pipe(take(1))
        .subscribe((isLoggedIn) => {
          if (isLoggedIn) {
            this.router.navigate(['/']);
            resolve(false);
          } else {
            resolve(true);
          }
        });
    });
  }
}
