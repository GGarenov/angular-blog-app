import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css'],
})
export class SingleCategoryComponent implements OnInit {
  postsArray: Array<object> = [];
  categoryObj: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      console.log(val);
      this.categoryObj = val;
      this.postService.loadCategoryPosts(val['id']).subscribe((post) => {
        this.postsArray = post;
      });
    });
  }
}
