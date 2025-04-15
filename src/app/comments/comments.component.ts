import { Component } from '@angular/core';
import { CommentCreateComponent } from "./comment-create/comment-create.component";

@Component({
  selector: 'app-comments',
  imports: [CommentCreateComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {

}
