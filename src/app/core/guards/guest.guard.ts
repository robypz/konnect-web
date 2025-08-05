import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';
import { Router } from 'express';

export const guestGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService).auth();
  return !auth;
};
