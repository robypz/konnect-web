import { Component, effect, inject, input, signal } from '@angular/core';
import { ChatComponent } from '../chats/chat/chat.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { Employee } from '../../work/employees/shared/employee.model';
import { ChatsComponent } from "../chats/chats.component";
import { MessageService } from './shared/message.service';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  private messageService = inject(MessageService);
  constructor(){
  }

}
