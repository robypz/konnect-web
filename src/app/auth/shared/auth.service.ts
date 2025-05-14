import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { config } from '../../../../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = config.API_URL + '/auth';
  private _forgotpassword = signal<boolean>(false);
  private _passwordReset = signal<boolean>(false);
  private _error = signal<any>(null);

  get forgotpassword() {
    return this._forgotpassword;
  }

  get passwordReset() {
    return this._passwordReset;
  }

  get error() {
    return this._error;
  }


  constructor() { }

  signin() {

  }

  signup() {

  }

  sendPasswordResetLink(body: any) {
    this.http.post(`${this.apiUrl}/sendPasswordResetLink`, body).subscribe({
      next: (response) => {
        this._forgotpassword.set(true);
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }

  resetPassword(body: any) {
    this.http.post(`${this.apiUrl}/resetPassword`, body).subscribe({
      next: (response) => {
        this._passwordReset.set(true);
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }
}
