import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  loadData() {
    return this.firestore
      .collection('users')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as object;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  deleteData(id: string) {
    this.firestore
      .doc(`users/${id}`)
      .delete()
      .then((docRef) => {
        this.toastr.success('User deleted successfully!');
      });
  }
}
