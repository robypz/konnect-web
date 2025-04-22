import { afterNextRender, Component } from '@angular/core';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-event-create',
  imports: [],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.scss'
})
export class EventCreateComponent {
  modal : Modal | null = null;
  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('create-event-modal') as HTMLElement);
    });
  }
  openModal(){
    this.modal?.show();
  }
  closeModal(){
    this.modal?.hide();
  }
}
