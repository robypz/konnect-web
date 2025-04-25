import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Department } from './department.model';
import { config } from '../../../../config';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private http = inject(HttpClient);
  private _departments = signal<Department[]>([]);
  private _department = signal<Department | null>(null);
  private apiUrl = config.API_URL+'/departments';

  departments() {
    return this._departments();
  }

  department() {
    return this._department;
  }

  constructor() { }

  index (){
    this.http.get<Department[]>(this.apiUrl).subscribe({
      next: (departments) => {
        this._departments.set(departments);
      },
      error: (error) => {
        console.error('Error fetching deparments:', error);
      }
    });
  }
}
