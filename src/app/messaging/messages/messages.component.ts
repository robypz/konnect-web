import { Component, computed, effect, inject, input, signal, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { MessageService } from './shared/message.service';
import { Message } from './shared/message.model';
import { MessageComponent } from "./message/message.component";
import { EchoService } from '../../core/services/echo.service';
import { AuthService } from '../../core/auth/shared/auth.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-messages',
  imports: [MessageComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  public chatId = input<string>();
  public employeeId$ = input<string>();
  private messageService = inject(MessageService);
  private messages$ = computed(() => this.messageService.messages());

  private echoService = inject(EchoService);
  private authService = inject(AuthService);
  private audio = new Audio('sounds/livechat-129007.mp3');
  private user$ = computed(() => this.authService.user());

  public get messages() {
    return this.messages$() as Message[];
  }


  public get user(): User {
    return this.user$() as User;
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
  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;

  private scrollToBottom() {
    if (this.messagesContainer) {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight + 80;
    }
  }

  ngOnInit(): void {
    if (this.chatId() && this.user) {
      this.echoService.echo.private('App.Models.User.' + this.user.id).notification((notification: any) => {
        this.messages.push(notification.message);
        this.audio.play();
        setTimeout(() => this.scrollToBottom(), 0);
      });
    }
  }

}
