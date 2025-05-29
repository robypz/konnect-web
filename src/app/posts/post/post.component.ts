import { afterNextRender, Component, input, OnInit } from '@angular/core';
import { Carousel, CarouselInterface, CarouselItem } from 'flowbite';
import { CommentsComponent } from "../../comments/comments.component";
import { Post } from '../shared/post.model';
import { config } from '../../../../config';

@Component({
  selector: 'app-post',
  imports: [CommentsComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  public _post = input<Post>();
  public apiFilesUrl = config.API_PUBLIC_FILES_URL;
  get post() {
    return this._post();
  }

  constructor() {
    afterNextRender(() => {
      const items: CarouselItem[] = [
        {
          position: 0,
          el: document.getElementById('carousel-item-1') as HTMLElement,
        },
        {
          position: 1,
          el: document.getElementById('carousel-item-2') as HTMLElement,
        },
        {
          position: 2,
          el: document.getElementById('carousel-item-3') as HTMLElement,
        },
        {
          position: 3,
          el: document.getElementById('carousel-item-4') as HTMLElement,
        },
        {
          position: 4,
          el: document.getElementById('carousel-item-5') as HTMLElement,
        },
      ];
      const carousel: CarouselInterface = new Carousel(document.getElementById('animation-carousel') as HTMLElement, items);
      // set event listeners for prev and next buttons
      const $prevButton = document.getElementById('data-carousel-prev') as HTMLElement;
      const $nextButton = document.getElementById('data-carousel-next') as HTMLElement;

      $prevButton.addEventListener('click', () => {
        carousel.prev();
      });

      $nextButton.addEventListener('click', () => {
        carousel.next();
      });
    });
  }

  ngOnInit(): void {
    const items: CarouselItem[] = [
        {
          position: 0,
          el: document.getElementById('carousel-item-1') as HTMLElement,
        },
        {
          position: 1,
          el: document.getElementById('carousel-item-2') as HTMLElement,
        },
        {
          position: 2,
          el: document.getElementById('carousel-item-3') as HTMLElement,
        },
        {
          position: 3,
          el: document.getElementById('carousel-item-4') as HTMLElement,
        },
        {
          position: 4,
          el: document.getElementById('carousel-item-5') as HTMLElement,
        },
      ];
      const carousel: CarouselInterface = new Carousel(document.getElementById('animation-carousel') as HTMLElement, items);
      // set event listeners for prev and next buttons
      const $prevButton = document.getElementById('data-carousel-prev') as HTMLElement;
      const $nextButton = document.getElementById('data-carousel-next') as HTMLElement;

      $prevButton.addEventListener('click', () => {
        carousel.prev();
      });

      $nextButton.addEventListener('click', () => {
        carousel.next();
      });
  }
}
