import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private firestore: AngularFirestore) {}

  loadFeatured() {
    return this.firestore
      .collection('posts', (ref) =>
        ref.where('isFeatured', '==', true).limit(4)
      )
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

  loadLatest() {
    return this.firestore
      .collection('posts', (ref) => ref.orderBy('createdAt', 'desc'))
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
}
