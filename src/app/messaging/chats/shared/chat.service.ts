import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Chat } from './chat.model';
import { config } from '../../../../../config';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  private _chat = signal<Chat | null>(null);
  private _chats = signal<Chat[]>([]);
  private _errors = signal<HttpErrorResponse | null>(null);
  private apiUrl = config.API_URL + '/chats'

  public get chat() {
    return this._chat;
  }

  public get chats() {
    return this._chats;
  }


  constructor() {
  }

  byEmployee() {
    this.http.get<Chat[]>(`${this.apiUrl}/byEmployee`).subscribe({
      next: (res) => {
        this._chats.set(res);
      },
      error: (err: HttpErrorResponse) => {
        this._errors.set(err);
      }
    });
  }

  store(body: any) {
    this.http.post<Chat>(`${this.apiUrl}`, body).subscribe({
      next: (res) => {
        this._chat.set(res);
        this._chats.update((chats) => [...chats, res]);
      },
      error: (err: HttpErrorResponse) => {
        this._errors.set(err);
      }
    });
  }

  show(chatId: string) {
    this.http.get<Chat>(`${this.apiUrl}/${chatId}`).subscribe({
      next: (res) => {
        this._chat.set(res);
      },
      error: (err: HttpErrorResponse) => {
        this._errors.set(err);
      }
    });
  }

  destroy(chatId: string) {
    this.http.delete(`${this.apiUrl}/${chatId}`).subscribe({
      next: (res) => {
        this._chat.set(null);
      },
      error: (err: HttpErrorResponse) => {
        this._errors.set(err);
      }
    });
  }

}
