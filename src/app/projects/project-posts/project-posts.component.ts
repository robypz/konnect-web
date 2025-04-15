import { Component } from '@angular/core';
import { PostCreateComponent } from "../../posts/post-create/post-create.component";
import { PostComponent } from "../../posts/post/post.component";

@Component({
  selector: 'app-project-posts',
  imports: [PostCreateComponent, PostComponent],
  templateUrl: './project-posts.component.html',
  styleUrl: './project-posts.component.scss'
})
export class ProjectPostsComponent {

}
