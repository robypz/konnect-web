import { Component, effect, input, signal } from '@angular/core';
import { ChatComponent } from '../chats/chat/chat.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { Employee } from '../../work/employees/shared/employee.model';
import { ChatsComponent } from "../chats/chats.component";

@Component({
  selector: 'app-messages',
  imports: [ChatComponent, ChatsComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

  constructor(){
  }
  
}
