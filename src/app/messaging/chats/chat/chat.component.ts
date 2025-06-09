import { Component, input } from '@angular/core';
import { MessageComponent } from '../../messages/message/message.component';
import { Chat } from '../shared/chat.model';


@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  public chat = input<Chat>();
}
