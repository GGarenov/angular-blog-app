import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class SubscribersService {
  constructor(private firebase: AngularFirestore) {}

  addSubs(subData: any) {
    this.firebase
      .collection('subscribers')
      .add(subData)
      .then(() => {
        console.log('Subscribed Successfully');
      });
  }
}
