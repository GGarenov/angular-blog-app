import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

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
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }
}
