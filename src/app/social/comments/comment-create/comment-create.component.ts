import { Component, computed, effect, inject, input } from '@angular/core';
import { CommentService } from '../shared/comment.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/shared/auth.service';
import { config } from '../../../../../config';
import { User } from '../../../core/models/user.model';
@Component({
  selector: 'app-comment-create',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-create.component.html',
  styleUrl: './comment-create.component.scss'
})
export class CommentCreateComponent {
  private commentService = inject(CommentService);
  private comment = computed(()=>this.commentService.comment);
  public postId = input<string>();
  private authService = inject(AuthService);
  private _user = computed(()=> this.authService.user());
  public apiFilesUrl = config.API_PUBLIC_FILES_URL;

  get user(){
    return this._user() as User;
  }

  createCommentForm = new FormGroup({
    post_id: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    project_id : new FormControl(''),
  });

  constructor (){
    effect(()=>{
      if (this.postId() !== this.createCommentForm.value.post_id) {
        this.createCommentForm.get('post_id')?.setValue(this.postId() as string);
      }
    });
  }

  create(){
    if (this.createCommentForm.valid) {
      this.commentService.store(this.createCommentForm.value);
      this.createCommentForm.reset();
    }
    
  }
}
