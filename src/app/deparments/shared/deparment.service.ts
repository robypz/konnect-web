import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Deparment } from './deparment.model';
import { config } from '../../../../config';

@Injectable({
  providedIn: 'root'
})
export class DeparmentService {
  private http = inject(HttpClient);
  private _deparments = signal<Deparment[]>([]);
  private _deparment = signal<Deparment | null>(null);
  private apiUrl = config.API_URL+'/deparments';

  deparments() {
    return this._deparments();
  }

  deparment() {
    return this._deparment;
  }

  constructor() { }

  index (){
    this.http.get<Deparment[]>(this.apiUrl).subscribe({
      next: (deparments) => {
        this._deparments.set(deparments);
      },
      error: (error) => {
        console.error('Error fetching deparments:', error);
      }
    });
  }
}
