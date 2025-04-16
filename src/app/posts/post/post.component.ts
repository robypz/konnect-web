import { afterNextRender, Component } from '@angular/core';
import { Carousel } from 'flowbite';
import { CommentsComponent } from "../../comments/comments.component";

@Component({
  selector: 'app-post',
  imports: [CommentsComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  carousel : Carousel | null = null;
  constructor() {
    afterNextRender(() => {
      this.carousel = new Carousel(document.getElementById('animation-carousel') as HTMLElement);
    });
  }
}
