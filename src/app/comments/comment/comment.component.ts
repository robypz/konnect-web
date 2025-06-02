import { Component, input } from '@angular/core';
import { Comment } from '../shared/comment.model';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  _comment = input<Comment>();

  get comment (){
    return this._comment() as Comment;
  }
}
