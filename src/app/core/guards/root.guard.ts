import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/shared/auth.service';

export const rootGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);

  return authService.hasRole('employee');
};
