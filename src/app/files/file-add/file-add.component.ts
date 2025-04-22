import { afterNextRender, Component } from '@angular/core';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-file-add',
  imports: [],
  templateUrl: './file-add.component.html',
  styleUrl: './file-add.component.scss'
})
export class FileAddComponent {
  modal : Modal | null = null;
  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('add-file-modal') as HTMLElement);
    });
  }
  openModal(){
    this.modal?.show();
  }
  closeModal(){
    this.modal?.hide();
  }
}
