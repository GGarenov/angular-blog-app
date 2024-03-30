import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  uploadImage(selectedImage: any, postData: any) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);

    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('post image uploaded successfully');

      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          console.log(URL);
          // const postData = { postImgPath: '' }; // Define postData object with postImgPath property
          postData.postImgPath = URL;
          console.log(postData);

          this.firestore
            .collection('posts')
            .add(postData)
            .then((docRef) => {
              this.toastr.success('Data saved successfully');
            });
        });
    });
  }
}
