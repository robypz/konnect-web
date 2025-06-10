import { Component, effect, inject, input } from '@angular/core';
import { Chat } from '../shared/chat.model';
import { User } from '../../../core/models/user.model';
import { config } from '../../../../../config';


@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  public chat$ = input<Chat>();
  public user$ = input<User>();
  public apiUrl = config.API_PUBLIC_FILES_URL;

  public get chat(): Chat {
    return this.chat$() as Chat;
  }

  public get user(): User {
    return this.user$() as User;
  }

  constructor() {

  }
}
