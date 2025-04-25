import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Department } from './department.model';
import { config } from '../../../../config';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private http = inject(HttpClient);
  private _deparments = signal<Department[]>([]);
  private _deparment = signal<Department | null>(null);
  private apiUrl = config.API_URL+'/departments';

  departments() {
    return this._deparments();
  }

  department() {
    return this._deparment;
  }

  constructor() { }

  index (){
    this.http.get<Department[]>(this.apiUrl).subscribe({
      next: (deparments) => {
        this._deparments.set(deparments);
      },
      error: (error) => {
        console.error('Error fetching deparments:', error);
      }
    });
  }
}
