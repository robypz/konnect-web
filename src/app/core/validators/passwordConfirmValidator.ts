import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchingPasswordsValidator: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
  const passwordControl = formGroup.get('password');
  const confirmPasswordControl = formGroup.get('password_confirmation');

  if (!passwordControl || !confirmPasswordControl) {
    return null; // Si alguno de los controles no existe, no se aplica validación.
  }

  // Si los valores son distintos, retornamos un error.
  if (passwordControl.value !== confirmPasswordControl.value) {
    return { passwordsMismatch: true };
  }

  return null; // No hay error si coinciden.
};
