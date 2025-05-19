import { afterNextRender, Component, computed, effect, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '../shared/event.service';
import { Modal } from 'flowbite';
import { timeValidator } from '../shared/timeValidator';

@Component({
  selector: 'app-event-create',
  imports: [ReactiveFormsModule],
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.scss'
})
export class EventCreateComponent {
  private eventService = inject(EventService);
  private event = computed(() => this.eventService.event());
  private error = computed(() => this.eventService.error());
  modal! : Modal;

  createEventForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required,]),
    time: new FormControl('',[Validators.required]),
    start_time: new FormControl('',[Validators.required]),
    end_time: new FormControl('',[Validators.required]),
    location: new FormControl('',[Validators.required]),
    event_type: new FormControl(null,[Validators.required]),
  },{validators: [timeValidator]});

  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('create-event-modal') as HTMLElement);
    });
    effect(()=>{
      if(this.event()){
        this.modal?.hide();
      }
      if(this.error()){
        console.log(this.error());
      }
    });
  }

  onSubmit() {
    if (this.createEventForm.valid) {
      this.eventService.store(this.createEventForm.value);
    } else {
      console.log(this.createEventForm.errors);
    }
  }

  openModal(){
    this.modal?.show();
  }
  closeModal(){
    this.modal?.hide();
  }
}
