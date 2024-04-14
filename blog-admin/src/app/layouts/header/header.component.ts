import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail: string = '';
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userEmail.subscribe((email) => {
      this.userEmail = email;
    });

    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
  }
}
