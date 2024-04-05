import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  postData: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((val) => {
      this.postService.loadOnePost(val['id']).subscribe((post) => {
        this.postData = post;
      });
    });
  }
}
