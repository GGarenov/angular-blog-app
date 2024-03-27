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
  categoryId: string = '';

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

    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
    } else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData);
      this.formStatus = 'Add';
    }

    formData.reset();
  }

  onEdit(category: CategoryData, id: string) {
    this.formCategory = category.category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: string) {
    this.categoryService.deleteData(id);
  }
}
