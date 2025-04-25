import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormGroupToFormDataService {

  constructor() { }

  static convert(formGroup: FormGroup): FormData {
    const formData = new FormData();

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);

      if (control instanceof FormControl) {
        if (control.value instanceof FileList) {
          for (let i = 0; i < control.value.length; i++) {
            const file = control.value.item(i);
            if (file) {
              formData.append(key, file);
            }
          }
        }
        else if (control.value instanceof Array) {
          control.value.forEach(element => {
            formData.append(`${key}[]`, element);
          });
        }
         else if (control.value !== null && control.value !== '') {
          formData.append(key, control.value);
        }
      } else if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          const nestedControl = control.get(nestedKey);

          if (nestedControl?.value instanceof FileList) {
            for (let i = 0; i < nestedControl.value.length; i++) {
              const file = nestedControl.value.item(i);
              if (file) {
                formData.append(`${key}[${nestedKey}][${i}]`, file);
              }
            }
          }
          else if (control.value instanceof Array) {
            control.value.forEach(element => {
              formData.append(`${key}[${nestedKey}]`, element);
            });
          } else if (nestedControl?.value !== null && nestedControl?.value !== '') {
            formData.append(`${key}[${nestedKey}]`, nestedControl?.value);
          }
        });
      }
    });

    return formData;
  }

}
