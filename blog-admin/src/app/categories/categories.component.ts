import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  onSubmit(formData: NgForm) {
    let categoryData = {
      category: formData.value.category,
    };
    console.log(categoryData);
  }
}
