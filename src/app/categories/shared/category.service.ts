import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { config } from '../../../../config';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiUrl = config.API_URL+'/categories';
  private _categories = signal<Category[]>([]);
  private _category = signal<Category | null>(null);
  private _errors = signal<any>(null);

  get categories() {
    return this._categories;
  }

  get category() {
    return this._category;
  }

  constructor() { }

  index() {
    this.http.get<Category[]>(this.apiUrl).subscribe({
      next: (response) => {
        this._categories.set(response);
      },
      error: (error) => {
        this._errors.set(error);
      }
    });
  }

  show(id: string) {
    this.http.get<Category>(`${this.apiUrl}/${id}`).subscribe({
      next: (response) => {
        this._category.set(response);
      },
      error: (error) => {
        this._errors.set(error);
      }
    });
  }
}
