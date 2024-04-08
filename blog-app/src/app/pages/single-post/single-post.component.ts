import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  postData: any;
  similarPostArray: Array<object> = [];
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.postService.countViews(val['id']);

      this.postService.loadOnePost(val['id']).subscribe((post) => {
        this.postData = post;
        this.loadSimilarPost(this.postData.category.categoryId);
      });
      this.isLoggedIn$ = this.authService.isLoggedIn();
    });
  }

  loadSimilarPost(catId: string) {
    this.postService.loadSimilar(catId).subscribe((val) => {
      this.similarPostArray = val;
    });
  }
}
