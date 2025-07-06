import { afterNextRender, computed, inject, Injectable } from '@angular/core';
import { config } from '../../../../config';
import Echo from 'laravel-echo';
import { io } from 'socket.io-client';
import Pusher from 'pusher-js';
import { AuthService } from '../auth/shared/auth.service';
@Injectable({
  providedIn: 'root'
})
export class EchoService {
  public echo!: Echo<any>;
  public authService = inject(AuthService);
  private token = computed(() => this.authService.token());
  constructor() {
    if (this.token()) {
      this.echo = new Echo({
        broadcaster: 'reverb',
        pusher: Pusher,
        key: config.REVERB_APP_KEY, // Your Reverb APP_KEY from .env
        wsHost: config.REVERB_HOST, // Or your Reverb server IP/domain
        wsPort: config.REVERB_PORT ?? 80,
        wssPort: config.REVERB_PORT ?? 443,
        forceTLS: true, // true if using HTTPS/SSL
        disableStats: true,
        authEndpoint: 'https://konnect-api.test/api/broadcasting/auth',
        // Si necesitas enviar credenciales (cookies, etc.):
        auth: {
          headers: {
            Authorization: `Bearer ${this.token()}`
          }
        }
      });
    }

  }
}
