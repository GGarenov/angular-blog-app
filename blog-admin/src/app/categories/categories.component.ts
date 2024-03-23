import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  constructor(private firestore: AngularFirestore) {}

  onSubmit(formData: NgForm) {
    let categoryData = {
      category: formData.value.category,
    };

    this.firestore
      .collection('categories')
      .add(categoryData)
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
