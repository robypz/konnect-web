import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Status } from '../models/status.model';
import { config } from '../../../../config';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private http = inject(HttpClient);
  private _statuses = signal<Status[]>([]);
  private apiUrl = config.API_URL + '/statuses';
  private _errors = signal<any>(null);

  get statuses() {
    return this._statuses;
  }

  index() {
    this.http.get<Status[]>(this.apiUrl).subscribe({
      next: (response) => {
        this._statuses.set(response);
      },
      error: (error) => {
        this._errors.set(error);
      }
    });
  }

  constructor() { }


}
