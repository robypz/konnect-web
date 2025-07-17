import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  imports: [],
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.scss'
})
export class SignoutComponent {
  private authService = inject(AuthService);
  private token = computed(() => this.authService.token());
  private readonly router = inject(Router);


  constructor(){
    effect(()=>{
      if (!this.token()) {
        this.router.navigate(['/']);
      }
    });
  }

  signout() {
    this.authService.signout();
  }
}
