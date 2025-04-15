import { afterNextRender, Component } from '@angular/core';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-post-create',
  imports: [],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent {
  modal : Modal | null = null;
  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('post-create-modal') as HTMLElement);
    });
  }
  openModal(){
    this.modal?.show();
  }
  closeModal(){
    this.modal?.hide();
  }
}
