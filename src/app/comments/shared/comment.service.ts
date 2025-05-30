import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Comment } from './comment.model';
import { config } from '../../../../config';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private http = inject(HttpClient);
  private _comments = signal<Comment[]>([]);
  private _comment = signal<Comment | null>(null);
  private _error = signal<HttpErrorResponse | null>(null);
  private apiUrl = config.API_URL+'/comments';

  constructor() { }

  public get error() {
    return this._error;
  }

  public get comments() {
    return this._comments;
  }

  public get comment() {
    return this._comment;
  }

  index() {
    this.http.get<any>(this.apiUrl).subscribe({
      next : (res:any) => {
        this._comments.set(res.body.data)
      },
      error : (err) => {
        this._error.set(err);
      },
    })
  }

  store(body:any){
        this.http.post<Comment>(this.apiUrl,body).subscribe({
      next : (comment) => {
        this._comments.update(comments => [...comments, comment]);
        this._comment.set(comment);
      },
      error : (err) => {
        this._error.set(err);
      },
    })
  }


}
