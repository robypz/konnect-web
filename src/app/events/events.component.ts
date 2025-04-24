import { Component } from '@angular/core';
import { EventComponent } from "./event/event.component";

@Component({
  selector: 'app-events',
  imports: [EventComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {

}
