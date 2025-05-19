import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const timeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const time = control.get('time')?.value;
  const startTime = control.get('start_time')?.value;
  const endTime = control.get('end_time')?.value;

  if (time && (!startTime || !endTime)) {
    return { eventDuration: 'you must set the event duration' };
  }

  return null;
};