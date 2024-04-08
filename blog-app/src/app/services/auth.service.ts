import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    if (user) {
      return this.afs.collection('users').doc(user.uid).set({
        firstName,
        lastName,
        email,
      });
    }
    return Promise.reject('User is null');
  }

  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((logRef) => {
        this.toastr.success('Login Successful');
        this.loadUser();
        this.loggedIn.next(true);
        this.isLoggedInGuard = true;
        this.router.navigate(['/']);
      })
      .catch((e) => {
        this.toastr.error(e);
      });
  }

  loadUser() {
    this.afAuth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  logout() {
    this.afAuth
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
