import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  featuredPostsArray: Array<object> = [];

  constructor(private postService: PostService) {
    this.postService.loadFeatured().subscribe((val) => {
      this.featuredPostsArray = val;
    });
  }

  ngOnInit(): void {}
}
