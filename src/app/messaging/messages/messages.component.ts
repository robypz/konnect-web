import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { ChatComponent } from '../chats/chat/chat.component';
import { ContactsComponent } from '../contacts/contacts.component';
import { Employee } from '../../work/employees/shared/employee.model';
import { ChatsComponent } from "../chats/chats.component";
import { MessageService } from './shared/message.service';
import { Message } from './shared/message.model';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  public chatId = input<string>();
  private messageService = inject(MessageService);
  private messages$ = computed(()=> this.messageService.messages());


  public get messages() {
    return this.messages$() as Message [];
  }


  constructor(){
    effect(()=>{
      if (this.chatId()) {
        this.messageService.byChat(this.chatId() as string);
      }
    })
  }

}
