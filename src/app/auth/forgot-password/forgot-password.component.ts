import { Component, computed, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);
  private forgotPassword = computed(()=>this.authService.forgotpassword());
  private error = computed(()=> this.authService.error());

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(){
    effect(() =>{
      if (this.error()) {
        console.log(this.error());
      }
    });
  }

  sendPasswordResetLink(){
    if (this.forgotPasswordForm.valid) {
      this.authService.sendPasswordResetLink(this.forgotPasswordForm.value);
    }

  }
}
