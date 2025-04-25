import { afterNextRender, Component, computed, effect, inject, OnInit } from '@angular/core';
import { Modal } from 'flowbite';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchingPasswordsValidator } from '../../core/validators/passwordConfirmValidator';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { DeparmentService } from '../../deparments/shared/deparment.service';
import { Deparment } from '../../deparments/shared/deparment.model';

@Component({
  selector: 'app-employee-create',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.scss'
})
export class EmployeeCreateComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private deparmentService = inject(DeparmentService);
  private _employee = computed(() => this.employeeService.employee());
  private _deparments = computed(() => this.deparmentService.deparments());
  public employee : Employee |null = this._employee();
  public deparments : Deparment[] = this._deparments();
  modal : Modal | null = null;

  createEmployeeForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    last_name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[#@$!%*?&]).*')] }),
    password_confirmation: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('',{ nonNullable: true, validators: [Validators.required,Validators.email] }),
    deparment_id: new FormControl('',{ nonNullable: true, validators: [Validators.required] }),
    job: new FormControl('',{ nonNullable: true, validators: [Validators.required] }),
    profile_photo : new FormControl<File|null>(null, { nonNullable: true, validators: [Validators.required] }),
  },{ validators: matchingPasswordsValidator });

  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('create-employee-modal') as HTMLElement);
    });
    effect(() => {
      if (this._employee() !== null) {
        console.log(this.employee);
      }
    });
  }

  ngOnInit(): void {
    this.deparmentService.index();
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

  }

}
