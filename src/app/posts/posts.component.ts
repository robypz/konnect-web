import { Component } from '@angular/core';
import { PostComponent } from "./post/post.component";
import { PostCreateComponent } from "./post-create/post-create.component";

@Component({
  selector: 'app-posts',
  imports: [PostComponent, PostCreateComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {

}
