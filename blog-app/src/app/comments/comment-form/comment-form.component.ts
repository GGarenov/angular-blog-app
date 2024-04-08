import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  isLoggedIn$: Observable<boolean> | undefined;
  name: string = '';
  content: string = '';

  constructor(
    private authService: AuthService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  onSubmit(): void {
    const comment = {
      name: this.name,
      content: this.content,
      date: new Date(),
    };
    console.log(comment);

    this.commentsService.addComment(comment);
    this.name = '';
    this.content = '';
  }
}
