import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';

interface Category {
  id: string;
  category: string;
}

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css'],
})
export class CategoryNavbarComponent implements OnInit {
  categoryArray: Array<Category> = [];
  userEmail: string = '';
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(
    private categoryService: CategoriesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe((val) => {
      this.categoryArray = val;
    });

    this.authService.loadUser();
    this.authService.userEmail.subscribe((email) => {
      this.userEmail = email;
    });

    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
  }
}
