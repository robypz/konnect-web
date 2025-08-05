import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';
import { User } from '../models/user.model';

export const employeeGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  return authService.hasRole('employee');
};
