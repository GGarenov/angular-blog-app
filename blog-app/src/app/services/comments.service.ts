import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Comment {
  name: string;
  content: string;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private firestore: AngularFirestore) {}

  getComments(): Observable<Comment[]> {
    return this.firestore.collection<Comment>('comments').valueChanges();
  }

  addComment(comment: Comment): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`comments/${id}`).set(comment);
  }
}
