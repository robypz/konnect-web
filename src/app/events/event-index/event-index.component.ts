import { Component } from '@angular/core';
import { EventCreateComponent } from "../event-create/event-create.component";
import { EventComponent } from "../event/event.component";

@Component({
  selector: 'app-event-index',
  imports: [EventCreateComponent, EventComponent],
  templateUrl: './event-index.component.html',
  styleUrl: './event-index.component.scss'
})
export class EventIndexComponent {

}
