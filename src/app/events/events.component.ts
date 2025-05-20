import { Component, computed, effect, inject } from '@angular/core';
import { EventComponent } from "./event/event.component";
import { EventService } from './shared/event.service';
import e from 'express';
import { Event } from './shared/event.model';

@Component({
  selector: 'app-events',
  imports: [EventComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  private eventService = inject(EventService);
  private _events = computed(() => this.eventService.events());
  public events! : Event[];

  constructor() {
    this.eventService.index();
    effect(()=>{
      if (this._events()) {
        this.events = this._events() as Event[];
      }
    });
  }
}
