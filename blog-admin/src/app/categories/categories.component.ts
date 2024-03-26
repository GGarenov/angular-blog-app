import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';

interface CategoryData {
  id: string;
  category: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  categoryArray: Array<CategoryData> = [];
  formCategory: string = '';
  formStatus: string = 'Add';

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val: any) => {
      console.log(val);
      this.categoryArray = val;
    });
  }

  onSubmit(formData: NgForm) {
    let categoryData: Category = {
      category: formData.value.category,
    };

    this.categoryService.saveData(categoryData);
    formData.reset();
  }

  onEdit(category: CategoryData) {
    this.formCategory = category.category;
    this.formStatus = 'Edit';
  }
}
