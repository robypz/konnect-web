import { afterNextRender, Component, computed, effect, inject, input } from '@angular/core';
import { CommentCreateComponent } from "./comment-create/comment-create.component";
import { Comment } from './shared/comment.model';
import { CommentComponent } from "./comment/comment.component";
import { Modal } from 'flowbite';
import { CommentService } from './shared/comment.service';

@Component({
  selector: 'app-comments',
  imports: [CommentCreateComponent, CommentComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent {
  private commentService = inject(CommentService);
  private _comments = computed(()=> this.commentService.comments());
  postId = input<string>();

  get comments(){
    return this._comments() as Comment[];
  }

  modal : Modal | null = null;
  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('comment-create-modal') as HTMLElement);
    });
    effect(()=>{
      if (this.postId()) {
        
      }
    });
  }
  openModal(){
    this.modal?.show();
  }
  closeModal(){
    this.modal?.hide();
  }
}
