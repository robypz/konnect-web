import { Component } from '@angular/core';
import { PostCreateComponent } from "../../posts/post-create/post-create.component";

@Component({
  selector: 'app-project-posts',
  imports: [PostCreateComponent],
  templateUrl: './project-posts.component.html',
  styleUrl: './project-posts.component.scss'
})
export class ProjectPostsComponent {

}
