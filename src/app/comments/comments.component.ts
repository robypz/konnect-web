import { afterNextRender, Component, input } from '@angular/core';
import { CommentCreateComponent } from "./comment-create/comment-create.component";
import { Comment } from './shared/comment.model';
import { CommentComponent } from "./comment/comment.component";
import { Modal } from 'flowbite';

@Component({
  selector: 'app-comments',
  imports: [CommentCreateComponent, CommentComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  comments = input<Comment[]>([]);

  modal : Modal | null = null;
  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('comment-create-modal') as HTMLElement);
    });
  }
  openModal(){
    this.modal?.show();
  }
  closeModal(){
    this.modal?.hide();
  }
}
