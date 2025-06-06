import { Component, computed, effect, inject, input } from '@angular/core';
import { Reaction } from './shared/reaction.model';
import { AuthService } from '../auth/shared/auth.service';
import { User } from '../core/models/user.model';
import { NgClass } from '@angular/common';
import { PostService } from '../posts/shared/post.service';

@Component({
  selector: 'app-reactions',
  imports: [],
  templateUrl: './reactions.component.html',
  styleUrl: './reactions.component.scss'
})
export class ReactionsComponent {
  private authService = inject(AuthService);
  private postService = inject(PostService);
  private _user = computed(() => this.authService.user());
  _reactions = input<Reaction[]>();
  _postId = input<string>();
  reacted = false;

  get reactions(): Reaction[] {
    return this._reactions() as Reaction[];
  }

  get user() {
    return this._user() as User;
  }

  get postId(): string {
    return this._postId() as string;
  }

  constructor() {
    effect(() => {
      if (this._user() && this.reactions) {
        this.reacted = this.hasReacted('like');
      }
      
    });
  }

  private hasReacted(type: string): boolean {
    return this.reactions.some(reaction => reaction.type === type && reaction.employee_id === this.user.employee.id);
  }

  react(type: string) {
    this.postService.react({ type: type }, this.postId, this.reacted);
    if (this.reacted) {
      this.reacted = false; 
    }
    else {
      this.reacted = true;
    }
  }
}
