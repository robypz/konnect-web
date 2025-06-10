import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Message } from './message.model';
import { config } from '../../../../../config';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private http = inject(HttpClient);
  private messages$ = signal<Message[]>([]);
  private error$ = signal<HttpErrorResponse|null>(null);
  private apiUrl = config.API_URL + '/messages';


  public get messages() {
    return this.messages$();
  }

  public get error(){
    return this.error$()
  }

  byChat(chatId:string){
    this.http.get(`${this.apiUrl}/byChat/${chatId}`).subscribe({
      next : (res:any)=>{
        this.messages$.set(res.data);
      },
      error : (err)=>{
        this.error$.set(err);
      },
    })
  }

  constructor() { }
}
