import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;
  userEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private firebaseAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) {
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (user) {
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.userEmail.next(user.email);
    }
  }

  login(email: string, password: string) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((logRef) => {
        this.toastr.success('Login Successful');
        this.loadUser();
        this.loggedIn.next(true);
        this.isLoggedInGuard = true;
        this.router.navigate(['/dashboard']);
      })
      .catch((e) => {
        this.toastr.error(e);
      });
  }

  loadUser() {
    this.firebaseAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.userEmail.next(user?.email as string);
    });
  }

  logout() {
    this.firebaseAuth
      .signOut()
      .then(() => {
        this.toastr.success('Logout Successful');
        localStorage.removeItem('user');
        this.loggedIn.next(false);
        this.isLoggedInGuard = false;
        this.router.navigate(['/login']);
      })
      .catch((e) => {
        this.toastr.error(e);
      });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
