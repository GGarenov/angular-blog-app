import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private toastr: ToastrService
  ) {}

  login(email: string, password: string) {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((logRef) => {
        this.toastr.success('Login Successful');
      });
  }
}
