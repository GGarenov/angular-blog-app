import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.png';
  selectedImg: any;

  constructor() {}

  onTitleChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    const title = target.value;
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview(event: Event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        this.imgSrc = e.target.result;
      }
    };
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      reader.readAsDataURL(target.files[0]);
      this.selectedImg = target.files[0];
    }
  }
}
