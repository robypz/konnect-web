import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http = inject(HttpClient);
  private _events = signal<Event[]>([]);
  private _event = signal<Event | null>(null);
  private _errors = signal<string[]>([]);

  constructor() { }

  get Events() {
    return this._events();
  }

  get Event() {
    return this._event();
  }

  get errors() {
    return this._errors();
  }

  index() {
    this.http.get<Event[]>('/api/events').subscribe({
      next: (events) => {
        this._events.set(events);
      },
      error: (error) => {
        this._errors.set(error.error.errors);
      }
    });
  }

  show(id: string) {
    this.http.get<Event>(`/api/events/${id}`).subscribe({
      next: (event) => {
        this._event.set(event);
      },
      error: (error) => {
        this._errors.set(error.error.errors);
      }
    });
  }

  store(event: Event) {
    this.http.post<Event>('/api/events', event).subscribe({
      next: (event) => {
        this._events.update(events => [...events, event]);
      },
      error: (error) => {
        this._errors.set(error.error.errors);
      }
    });
  }
  update(event: Event) {
    this.http.put<Event>(`/api/events/${event.id}`, event).subscribe({
      next: (event) => {
        this._events.update(events => events.map(e => e.id === event.id ? event : e));
      },
      error: (error) => {
        this._errors.set(error.error.errors);
      }
    });
  }

  destroy(id: string) {
    this.http.delete(`/api/events/${id}`).subscribe({
      next: () => {
        this._events.update(events => events.filter(event => event.id !== id));
      },
      error: (error) => {
        this._errors.set(error.error.errors);
      }
    });
  }

}
