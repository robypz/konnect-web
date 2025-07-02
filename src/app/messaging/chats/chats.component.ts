import { Component, computed, effect, inject, model, OnInit, signal } from '@angular/core';
import { ContactsComponent } from "../contacts/contacts.component";
import { Employee } from '../../work/employees/shared/employee.model';
import { ChatComponent } from "./chat/chat.component";
import { ChatService } from './shared/chat.service';
import { Chat } from './shared/chat.model';
import { AuthService } from '../../core/auth/shared/auth.service';
import { User } from '../../core/models/user.model';
import { ChatShowComponent } from "./chat-show/chat-show.component";
import { EchoService } from '../../core/services/echo.service';


@Component({
  selector: 'app-chats',
  imports: [ContactsComponent, ChatComponent, ChatShowComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent {
  private authService = inject(AuthService);
  private user$ = computed(() => this.authService.user());
  private chatService = inject(ChatService);
  private chats$ = computed(() => this.chatService.chats());
  private employee$ = signal<Employee | null>(null)

  private echoService = inject(EchoService);

  public selectedChat$ = model<Chat>();

  public get chats(): Chat[] {
    return this.chats$() as Chat[];
  }

  public get user(): User {
    return this.user$() as User;
  }

  public set setSelectedChat(chat: Chat) {
    this.selectedChat$.set(chat);
  }

  public get getSelectedChat() {
    return this.selectedChat$() as Chat;
  }



  public set setEmployee(e: Employee) {
    this.employee$.set(e);
  }

  public get employee() {
    return this.employee$() as Employee;
  }

  constructor() {
    this.chatService.byEmployee();
    effect(() => {
      if (this.user) {
        this.echoService.echo.channel(`App.Models.User.${this.user.id}`)
          .listen('BroadcastNotificationCreated', (e: any) => {
            console.log('Notificación recibida:', e);
          });
      }
    })
  }

}
