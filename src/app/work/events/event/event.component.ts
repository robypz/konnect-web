import { Component, effect, input } from '@angular/core';
import { Event } from '../shared/event.model';

@Component({
  selector: 'app-event',
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  _event = input<Event>();
  event!: Event;
  constructor(){
    effect(()=>{
      if (this._event()) {
        this.event = this._event() as Event;
      }
    })
  }
}
