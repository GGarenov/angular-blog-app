import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  uploadImage(selectedImage: any, postData: any, formStatus: string, id: any) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);

    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('post image uploaded successfully');

      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          console.log(URL);

          postData.postImgPath = URL;
          console.log(postData);

          if (formStatus == 'Edit') {
            this.updateData(id, postData);
          } else {
            this.saveData(postData);
          }
        });
    });
  }

  saveData(postData: any) {
    this.firestore
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toastr.success('Data saved successfully');
        this.router.navigate(['/post']);
      });
  }

  loadData() {
    return this.firestore
      .collection('posts')
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

  loadOneData(id: string) {
    return this.firestore.doc(`posts/${id}`).valueChanges();
  }

  updateData(id: any, postData: any) {
    this.firestore
      .doc(`posts/${id}`)
      .update(postData)
      .then(() => {
        this.toastr.success('Data updated successfully');
        this.router.navigate(['/post']);
      });
  }

  deleteImage(postImgPath: string, id: any) {
    this.storage.storage
      .refFromURL(postImgPath)
      .delete()
      .then(() => {
        this.deleteData(id);
      });
  }

  deleteData(id: any) {
    this.firestore
      .doc(`posts/${id}`)
      .delete()
      .then(() => {
        this.toastr.warning('Data deleted successfully');
        this.router.navigate(['/post']);
      });
  }

  markFeatured(id: any, featuredData: any) {
    this.firestore
      .doc(`posts/${id}`)
      .update(featuredData)
      .then(() => {
        this.toastr.info('Featured status updated successfully');
      });
  }
}
