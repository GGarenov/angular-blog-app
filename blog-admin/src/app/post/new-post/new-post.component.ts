import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';

interface Category {
  id: string;
  data: {
    category: string;
  };
}

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.png';
  selectedImg: any;

  categories: Category[] = [];

  postForm: FormGroup = new FormGroup({});

  post: any;

  formStatus: string = 'Add new';

  docId: string = '';

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((val) => {
      this.docId = val['id'];

      if (this.docId) {
        this.postService.loadOneData(val['id']).subscribe((post) => {
          this.post = post;
          this.postForm = this.fb.group({
            title: [
              this.post.title,
              [Validators.required, Validators.minLength(10)],
            ],
            permalink: [this.post.permalink, [Validators.required]],
            excerpt: [
              this.post.excerpt,
              [Validators.required, Validators.minLength(10)],
            ],
            category: [
              `${this.post.category.categoryId}-${this.post.category.category}`,
              [Validators.required],
            ],
            postImg: ['', [Validators.required]],
            content: [this.post.content, [Validators.required]],
          });

          this.imgSrc = this.post.postImgPath;
          this.formStatus = 'Edit';
        });
      } else {
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', [Validators.required]],
          excerpt: ['', [Validators.required, Validators.minLength(10)]],
          category: ['', [Validators.required]],
          postImg: ['', [Validators.required]],
          content: ['', [Validators.required]],
        });
      }
    });
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val: any[]) => {
      this.categories = val.map((item) => ({
        id: item.id,
        data: {
          category: item.category,
        },
      }));
    });
  }

  get fc() {
    return this.postForm.controls;
  }

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

  onSubmit() {
    let splitted = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };

    this.postService.uploadImage(
      this.selectedImg,
      postData,
      this.formStatus,
      this.docId
    );
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.png';
  }
}
