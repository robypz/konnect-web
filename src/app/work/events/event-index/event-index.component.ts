import { Component, computed, effect, inject } from '@angular/core';
import { EventCreateComponent } from "../event-create/event-create.component";
import { EventComponent } from "../event/event.component";
import { EventService } from '../shared/event.service';
import { Event } from '../shared/event.model';

@Component({
  selector: 'app-event-index',
  imports: [EventCreateComponent, EventComponent],
  templateUrl: './event-index.component.html',
  styleUrl: './event-index.component.scss'
})
export class EventIndexComponent {
  private eventService = inject(EventService);
  private _events = computed(()=> this.eventService.events());
  public events : Event[] = [];

  constructor(){
    this.eventService.index();
    effect(()=>{
      if (this._events()) {
        this.events = this._events();
      }
    })
  }
}
