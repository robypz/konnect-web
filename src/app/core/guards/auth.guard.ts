import { computed, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService).auth();
  return auth;
};
