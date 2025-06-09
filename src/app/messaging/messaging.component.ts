import { Component } from '@angular/core';
import { ChatsComponent } from "./chats/chats.component";

@Component({
  selector: 'app-messaging',
  imports: [ChatsComponent],
  templateUrl: './messaging.component.html',
  styleUrl: './messaging.component.scss'
})
export class MessagingComponent {

}
