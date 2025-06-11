import { Component, input } from '@angular/core';
import { Message } from '../shared/message.model';

@Component({
  selector: 'app-message',
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  public message$ = input<Message>();
  public employeeId$ = input<string>();

  public get message() : Message {
    return this.message$() as Message;
  }

    public get employeeId() : string {
    return this.employeeId$() as string;
  }

}
