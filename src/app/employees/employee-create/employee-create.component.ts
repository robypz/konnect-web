import { afterNextRender, Component } from '@angular/core';
import { Modal } from 'flowbite';
import { EmailValidator, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.scss'
})
export class EmployeeCreateComponent {
  modal : Modal | null = null;

  createEmployeeForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    last_name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
    password_confirmation: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('',{ nonNullable: true, validators: [Validators.required,Validators.email] }),
    deparment_id: new FormControl('',{ nonNullable: true, validators: [Validators.required] }),
    job: new FormControl('',{ nonNullable: true, validators: [Validators.required] }),
    profile_photo : new FormControl<File|null>(null, { nonNullable: true, validators: [Validators.required] }),
  });

  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('create-employee-modal') as HTMLElement);
    });
  }
  openModal(){
    this.modal?.show();
  }
  closeModal(){
    this.modal?.hide();
  }

  profilePhotoUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.createEmployeeForm.patchValue({ profile_photo: file });
    }
  }

  createEmployee(){
    if (this.createEmployeeForm.valid) {
      console.log(this.createEmployeeForm.value as FormData);
    }
    else{
      console.log(this.createEmployeeForm.errors);
    }

  }
}
