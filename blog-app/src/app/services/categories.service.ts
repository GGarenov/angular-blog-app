import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

interface Category {
  id: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: AngularFirestore) {}

  loadData() {
    return this.firestore
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const { id, ...data } = a.payload.doc.data() as Category; // Destructure id from data
            const docId = a.payload.doc.id;
            return { id: docId, ...data };
          });
        })
      );
  }
}
