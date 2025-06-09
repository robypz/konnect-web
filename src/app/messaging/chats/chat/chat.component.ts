import { Component, computed, effect, inject, input } from '@angular/core';
import { MessageComponent } from '../../messages/message/message.component';
import { Employee } from '../../../work/employees/shared/employee.model';
import { config } from '../../../../../config';
import { ChatService } from '../shared/chat.service';
import { Chat } from '../shared/chat.model';


@Component({
  selector: 'app-chat',
  imports: [MessageComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  private chatService = inject(ChatService);
  private chat$ = computed(()=>this.chatService.chat());
  employee$ = input<Employee>();

  apiFilesUrl = config.API_PUBLIC_FILES_URL;

  public get employee() {
    return this.employee$() as Employee;
  }

  public get chat(){
    return this.chat$() as Chat;
  }

  constructor(){
    effect(()=>{

    });
  }

}
