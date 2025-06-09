import { Component, computed, effect, inject, signal } from '@angular/core';
import { ContactsComponent } from "../contacts/contacts.component";
import { Employee } from '../../work/employees/shared/employee.model';
import { ChatComponent } from "./chat/chat.component";
import { ChatService } from './shared/chat.service';
import { Chat } from './shared/chat.model';

@Component({
  selector: 'app-chats',
  imports: [ContactsComponent, ChatComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent {
  private chatService = inject(ChatService);
  private chats$ = computed(()=> this.chatService.chats());
  private employee$ = signal<Employee | null>(null)


  public get chats() : Chat[] {
    return this.chats$() as Chat[];
  }


  public set setEmployee(e: Employee) {
    this.employee$.set(e);
  }

  public get employee() {
    return this.employee$() as Employee;
  }

  constructor() {
    effect(() => {

    })
  }

}
