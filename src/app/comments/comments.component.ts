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
  comments = input<Comment[]>([
    { id: "1", content: 'This is a comment' },
    { id: "2", content: 'This is another comment' },
    { id: "3", content: 'Yet another comment' },
    { id: "4", content: 'This is a comment' },
    { id: "5", content: 'This is another comment' },
    { id: "6", content: 'Yet another comment' }
  ]);

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
