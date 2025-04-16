import { afterNextRender, Component, input } from '@angular/core';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-task-create',
  imports: [],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss'
})
export class TaskCreateComponent {
  projectId = input<string>();
  modal : Modal | null = null;
  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('task-create-modal') as HTMLElement);
    });
  }
  openModal(){
    this.modal?.show();
  }
  closeModal(){
    this.modal?.hide();
  }
}
