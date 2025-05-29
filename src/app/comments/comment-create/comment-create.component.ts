import { Component, inject, input } from '@angular/core';
import { CommentService } from '../shared/comment.service';

@Component({
  selector: 'app-comment-create',
  imports: [],
  templateUrl: './comment-create.component.html',
  styleUrl: './comment-create.component.scss'
})
export class CommentCreateComponent {
  private commentService = inject(CommentService);
  postId = input<string>();
}
