import { Component } from '@angular/core';
import { PostCreateComponent } from '../../../social/posts/post-create/post-create.component';
import { PostComponent } from '../../../social/posts/post/post.component';

@Component({
  selector: 'app-project-posts',
  imports: [PostCreateComponent, PostComponent],
  templateUrl: './project-posts.component.html',
  styleUrl: './project-posts.component.scss'
})
export class ProjectPostsComponent {

}
