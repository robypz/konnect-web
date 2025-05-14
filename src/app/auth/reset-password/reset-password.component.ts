import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { matchingPasswordsValidator } from '../../core/validators/passwordConfirmValidator';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private authService = inject(AuthService);
  private passwordReset = computed(()=> this.authService.passwordReset());
  private error = computed(()=> this.authService.error());
  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    token: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#@$!%*?&])[A-Za-z\\d#@$!%*?&]{8,}$")]),
    password_confirmation: new FormControl('', [Validators.required,]),
  },{validators : matchingPasswordsValidator});

  ngOnInit(): void {
    this.resetPasswordForm.patchValue({ token: this.route.snapshot.queryParamMap.get('token') });
  }

  constructor(){
    effect(()=>{
      if(this.error()!=null){
        console.log(this.error);
      }
    });
  }

  resetPassword(){
    this.authService.resetPassword(this.resetPasswordForm.value);
  }
}
