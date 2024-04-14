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
  userEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {
    const user = localStorage.getItem('user');
    if (user) {
      this.loggedIn.next(true);
    }
  }

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
      this.afAuth.signOut();
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
        this.router.navigate(['/']);
      })
      .catch((e) => {
        if (
          e.code === 'auth/wrong-password' ||
          e.code === 'auth/user-not-found' ||
          e.code === 'auth/invalid-email' ||
          e.code === 'auth/invalid-credential'
        ) {
          this.toastr.error('Wrong credentials');
        } else {
          this.toastr.error(e.message);
        }
      });
  }

  loadUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.loggedIn.next(true);
        this.userEmail.next(user.email ?? '');
      } else {
        localStorage.removeItem('user');
        this.loggedIn.next(false);
        this.userEmail.next('');
      }
    });
  }

  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        this.toastr.success('Logout Successful');
        localStorage.removeItem('user');
        this.loggedIn.next(false);
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
