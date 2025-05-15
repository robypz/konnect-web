import { Component, computed, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  private readonly router = inject(Router);
  private authService = inject(AuthService);
  public auth = computed(() => this.authService.auth());
  private error = computed(() => this.authService.error());

  signinForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    device_name: new FormControl('', [Validators.required])
  });

  constructor() {
    this.signinForm.patchValue({ device_name: this.authService.getDeviceName() });
    effect(() => {
      if (this.auth()) {
        console.log(this.auth());
        this.router.navigate(['/dashboard']);
      }
      if (this.error()) {
        console.log(this.error());
      }
    });
  }

  signin() {
    this.authService.signin(this.signinForm.value);
  }
}
