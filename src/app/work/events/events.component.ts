import { Component, computed, effect, inject, model } from '@angular/core';
import { EventComponent } from "./event/event.component";
import { EventService } from './shared/event.service';
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
  public eventsCount = model<number>(0);

  constructor() {
    this.eventService.index();
    effect(()=>{
      if (this._events()) {
        this.events = this._events() as Event[];
        this.eventsCount.set(this.events.length);
      }
    });
  }
}
