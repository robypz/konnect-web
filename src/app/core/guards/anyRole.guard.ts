import { inject, Injector, runInInjectionContext } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { CanActivateFn } from '@angular/router';

export const anyRoleGuard: (role: string[]) => CanActivateFn = (role: string[]) => {
  return () => {
    return runInInjectionContext(inject(Injector), () => {
      const authService = inject(AuthService);
      return authService.hasAnyRole(role);
    });
  };
};
