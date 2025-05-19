import { /*afterNextRender,*/ Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//import { Modal } from 'flowbite';

@Component({
  selector: 'app-event-create',
  imports: [ReactiveFormsModule],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.scss'
})
export class EventCreateComponent {
  //modal : Modal | null = null;

  createEventForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required,]),
    time: new FormControl('',[Validators.required]),
    start_time: new FormControl('',[Validators.required]),
    end_time: new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required]),
  });



  constructor() {
    /*afterNextRender(() => {
      this.modal = new Modal(document.getElementById('create-event-modal') as HTMLElement);
    });*/

  }
  /*openModal(){
    this.modal?.show();
  }
  closeModal(){
    this.modal?.hide();
  }*/
}
