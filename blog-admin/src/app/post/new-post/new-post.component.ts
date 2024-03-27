import { Component } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent {
  permalink: string = '';

  constructor() {}

  onTitleChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    const title = target.value;
    this.permalink = title.replace(/\s/g, '-');
  }
}
