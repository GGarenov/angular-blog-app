import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private storage: AngularFireStorage) {}

  uploadImage(selectedImage: any, postData: string) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);

    this.storage.upload(filePath, selectedImage).then(() => {
      console.log('post image uploaded successfully');

      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          console.log(URL);
          const postData = { postImgPath: '' }; // Define postData object with postImgPath property
          postData.postImgPath = URL;
          console.log(postData);
        });
    });
  }
}
