import { Component, effect, input } from '@angular/core';
import { Chat } from '../shared/chat.model';
import { log } from 'console';
import { User } from '../../../core/models/user.model';
import { config } from '../../../../../config';
import { MessagesComponent } from "../../messages/messages.component";

@Component({
  selector: 'app-chat-show',
  imports: [MessagesComponent],
  templateUrl: './chat-show.component.html',
  styleUrl: './chat-show.component.scss'
})
export class ChatShowComponent {
  public chat$ = input<Chat>();
  public user$ = input<User>();
  public apiFilesUrl = config.API_PUBLIC_FILES_URL;
  constructor() {
  }

  public get user(): User {
    return this.user$() as User;
  }

  public get chat(): Chat {
    return this.chat$() as Chat;
  }

}
