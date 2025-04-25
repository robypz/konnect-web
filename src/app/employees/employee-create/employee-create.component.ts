import { afterNextRender, Component, computed, effect, inject, OnInit } from '@angular/core';
import { Modal } from 'flowbite';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchingPasswordsValidator } from '../../core/validators/passwordConfirmValidator';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { Department } from '../../deparments/shared/department.model';
import { DepartmentService } from '../../deparments/shared/department.service';
import { FormGroupToFormDataService } from '../../core/libs/form-group-to-form-data.service';

@Component({
  selector: 'app-employee-create',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.scss'
})
export class EmployeeCreateComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private _employee = computed(() => this.employeeService.employee());
  private _errors = computed(() => this.employeeService.errors());
  private _departments = computed(() => this.departmentService.departments());
  public employee : Employee |null = null;
  public departments : Department[] = [];
  modal : Modal | null = null;

  createEmployeeForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    last_name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[#@$!%*?&]).*')] }),
    password_confirmation: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('',{ nonNullable: true, validators: [Validators.required,Validators.email] }),
    department_id: new FormControl('',{ nonNullable: true, validators: [Validators.required] }),
    job: new FormControl('',{ nonNullable: true, validators: [Validators.required] }),
    profile_photo : new FormControl<File|null>(null),
  },{ validators: matchingPasswordsValidator });

  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('create-employee-modal') as HTMLElement);
    });
    effect(() => {
      if (this._employee() !== null) {
        console.log(this.employee);
      }
      if (this._departments().length > 0) {
        this.departments = this._departments();
      }
      if (this._errors().length > 0) {
        console.log(this._errors());
      }
    });
  }

  ngOnInit(): void {
    this.departmentService.index();
  }

  openModal(){
    this.modal?.show();
  }
  closeModal(){
    this.modal?.hide();
  }

  profilePhotoUpload(event: any) {
    this.createEmployeeForm.get('profile_photo')?.setValue(event.target.files[0]);
  }

  createEmployee(){
    if (this.createEmployeeForm.valid) {
      this.employeeService.store(FormGroupToFormDataService.convert(this.createEmployeeForm));
    }
  }

}
