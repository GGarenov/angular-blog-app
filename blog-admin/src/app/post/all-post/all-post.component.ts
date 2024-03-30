import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

interface Post {
  id: string;
  postImgPath: string;
  title: string;
  excerpt: string;
  category: { category: string };
  createdAt: { seconds: number };
  isFeatured: boolean;
  // Add other properties as needed
}

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css'],
})
export class AllPostComponent implements OnInit {
  postArray: Post[] = [];

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.postService.loadData().subscribe((val: any) => {
      console.log(val);
      this.postArray = val as Post[];
    });
  }

  onDelete(postImgPath: any, id: any) {
    this.postService.deleteImage(postImgPath, id);
  }

  onFeatured(id: any, value: boolean) {
    const featuredData = {
      isFeatured: value,
    };

    this.postService.markFeatured(id, featuredData);
  }
}
