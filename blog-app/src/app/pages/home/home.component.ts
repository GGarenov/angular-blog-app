import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private postService: PostService) {
    this.postService.loadData().subscribe((val) => {
      console.log(val);
    });
  }

  ngOnInit(): void {}
}
