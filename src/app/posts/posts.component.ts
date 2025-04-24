import { Component } from '@angular/core';
import { PostComponent } from "./post/post.component";

@Component({
  selector: 'app-posts',
  imports: [PostComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {

}
