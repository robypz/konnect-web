import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Event } from './event.model';
import { config } from '../../../../config';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http = inject(HttpClient);
  private _events = signal<Event[]>([]);
  private _event = signal<Event | null>(null);
  private _error = signal<HttpErrorResponse|null>(null);
  private apiUrl = config.API_URL+'/events';

  constructor() { }

  get events() {
    return this._events;
  }

  get event() {
    return this._event;
  }

  get error() {
    return this._error;
  }

  index() {
    this.http.get(`${this.apiUrl}`).subscribe({
      next: (res:any) => {
        this._events.set(res.data as Event[]);
        this._error.set(null);
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }

  show(id: string) {
    this.http.get<Event>(`/api/events/${id}`).subscribe({
      next: (event) => {
        this._event.set(event);
      },
      error: (error) => {
        this._error.set(error.error.errors);
      }
    });
  }

  store(data: any) {
    this.http.post<Event>(`${this.apiUrl}`, data).subscribe({
      next: (event) => {
        this._events.update(events => [...events, event]);
        this._event.set(event);
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }
  update(event: Event) {
    this.http.put<Event>(`/api/events/${event.id}`, event).subscribe({
      next: (event) => {
        this._events.update(events => events.map(e => e.id === event.id ? event : e));
      },
      error: (error) => {
        this._error.set(error.error.errors);
      }
    });
  }

  destroy(id: string) {
    this.http.delete(`/api/events/${id}`).subscribe({
      next: () => {
        this._events.update(events => events.filter(event => event.id !== id));
      },
      error: (error) => {
        this._error.set(error.error.errors);
      }
    });
  }

}
