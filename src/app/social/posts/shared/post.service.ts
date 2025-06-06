import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { Post } from './post.model';
import { Reaction } from '../../reactions/shared/reaction.model';
import { config } from '../../../../../config';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private _post = signal<Post | null>(null);
  private _posts = signal<Post[]>([]);
  private _error = signal<HttpErrorResponse | null>(null);

  private apiUrl = config.API_URL + '/posts';

  constructor() { }

  public get post(): Signal<Post | null> {
    return this._post;
  }

  public get posts(): Signal<Post[]> {
    return this._posts;
  }

  public get error(): Signal<HttpErrorResponse | null> {
    return this._error;
  }

  public index() {
    this.http.get(this.apiUrl).subscribe({
      next: (res: any) => {
        this._posts.set(res.data);
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }

  public show(id: string) {
    this.http.get<Post>(`${this.apiUrl}/${id}`).subscribe({
      next: (posts) => {
        this._post.set(posts);
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }

  public store(body: any) {
    this.http.post<Post>(this.apiUrl, body).subscribe({
      next: (newPost) => {
        this._posts.update(posts => [...posts, newPost]);
        this._post.set(newPost);
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }

  public update(id: string, body: any) {
    this.http.put<Post>(`${this.apiUrl}/${id}`, body).subscribe({
      next: (updatedPost) => {
        this._posts.update(posts => posts.map(post => post.id === id ? updatedPost : post));
        this._post.set(updatedPost);
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }

  public delete(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this._posts.update(posts => posts.filter(post => post.id !== id));
        this._post.set(null);
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }

  public react(body: any, postId: string, reacted: boolean) {
    this.http.post<Reaction>(`${this.apiUrl}/react/${postId}`, body).subscribe({
      next: (reaction) => {
        if (reacted) {
          this._posts.update(posts => 
            posts.map(post => {
              if (post.id === postId) {
                post.reactions = post.reactions.filter(r => r.employee_id !== reaction.employee_id);
              }
              return post;
            })
          );
        }else{
          this._posts.update(posts => 
            posts.map(post => {
              if (post.id === postId) {
                post.reactions.push(reaction);
              }
              return post;
            })
          );
        }
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }
}
