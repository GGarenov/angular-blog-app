import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

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

  postForm: FormGroup;

  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      title: [''],
      permalink: [''],
      excerpt: [''],
      category: [''],
      postImg: [''],
      content: [''],
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
