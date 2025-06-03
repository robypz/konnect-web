import { Component, computed, effect, inject, input } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostService } from './shared/post.service';
import { Post } from './shared/post.model';

@Component({
  selector: 'app-posts',
  imports: [PostComponent, PostCreateComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  employeeId = input<string>();

  private postService = inject(PostService);
  private _posts = computed(() => this.postService.posts());
  private _error = computed(() => this.postService.error());
  get posts(): Post[] {
    return this._posts() as Post[];
  }

  constructor(){
    this.postService.index();
    effect(()=>{
      console.log('cambio');
    });
  }
}
