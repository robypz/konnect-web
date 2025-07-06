import { Component, computed, effect, inject, input, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MessageService } from './shared/message.service';
import { Message } from './shared/message.model';
import { MessageComponent } from "./message/message.component";

@Component({
  selector: 'app-messages',
  imports: [MessageComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  public chatId = input<string>();
  public employeeId$ = input<string>();
  private messageService = inject(MessageService);
  private messages$ = computed(()=> this.messageService.messages());
  private _messagesInOrder = computed(()=> this.messages.reverse());

  public get messages() {
    return this.messages$() as Message [];
  }

  public get messagesInOrder() {
    return this._messagesInOrder() as Message[];
  }

    public get employeeId() {
    return this.employeeId$() as string;
  }

  constructor() {
    effect(() => {
      if (this.chatId()) {
        this.messageService.byChat(this.chatId() as string);
      }
    });
  }

}
