import { Component } from '@angular/core';
import { ContactsComponent } from "./contacts/contacts.component";
import { ChatComponent } from "./chat/chat.component";

@Component({
  selector: 'app-messages',
  imports: [ContactsComponent, ChatComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

}
