import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
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
  private _auth = signal<boolean>(false)
  private _token = signal<string | null>(null);

  get forgotpassword() {
    return this._forgotpassword;
  }

  get passwordReset() {
    return this._passwordReset;
  }

  get token() {
    return this._token;
  }

  get auth() {
    return this._auth;
  }

  get error() {
    return this._error;
  }


  constructor() {
    this._token.set(localStorage.getItem('konnect-token'));
    effect(() => {
      if (this._token()) {
        this._auth.set(true);
      } else {
        this._auth.set(false);
      }
    })
  }

  signin(body: any) {
    this.http.post<string>(`${this.apiUrl}/signin`, body).subscribe({
      next: (response) => {
        localStorage.setItem('konnect-token', response);
        this._token.set(response);
        this._auth.set(true);
      },
      error: (error) => {
        this._error.set(error);
      },
    });
  }

  signup(body: any) {
    this.http.post<string>(`${this.apiUrl}/signup`, body).subscribe({
      next: (response) => {
        localStorage.setItem('konnect-token', response);
      },
      error: (error) => {
        this._error.set(error);
      },
    });
  }

  signout() {
    this.http.post<string>(`${this.apiUrl}/signout`, null).subscribe({
      next: (response) => {
        localStorage.removeItem('konnect-token');
      },
      error: (error) => {
        this._error.set(error);
      },
    });
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

  getDeviceName() {
    let userAgent = navigator.userAgent;
    if (userAgent.includes("Windows")) return "PC con Windows";
    if (userAgent.includes("Mac")) return "Mac";
    if (userAgent.includes("Android")) return "Dispositivo Android";
    if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "Dispositivo iOS";
    return "Desconocido";
  }
}
