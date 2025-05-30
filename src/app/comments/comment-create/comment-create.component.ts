import { Component, computed, inject, input } from '@angular/core';
import { CommentService } from '../shared/comment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-comment-create',
  imports: [],
  templateUrl: './comment-create.component.html',
  styleUrl: './comment-create.component.scss'
})
export class CommentCreateComponent {
  private commentService = inject(CommentService);
  private comment = computed(()=>this.commentService.comment);
  public postId = input<string>();

  createCommentForm = new FormGroup({
    post_id: new FormControl('', [Validators.required]),
    employee_id: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  constructor (){

  }

  create(){
    if (this.createCommentForm.valid) {
      this.commentService.store(this.createCommentForm.value);
    }
    
  }
}
