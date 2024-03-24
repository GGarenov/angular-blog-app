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
    let subCategoryData = {
      subCategory: 'subCategory1',
    };

    this.firestore
      .collection('categories')
      .add(categoryData)
      .then((docRef) => {
        console.log(docRef);
        this.firestore
          .collection('categories')
          .doc(docRef.id)
          .collection('subCategories')
          .add(subCategoryData)
          .then((docRef1) => {
            console.log(docRef1);
            this.firestore
              .collection('categories')
              .doc(docRef.id)
              .collection('subCategories')
              .doc(docRef1.id)
              .collection('subSubCategories')
              .add(subCategoryData)
              .then((docRef2) => {
                console.log('Second level sub category added');
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
