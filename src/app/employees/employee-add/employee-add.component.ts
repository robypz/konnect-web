import { afterNextRender, Component, inject } from '@angular/core';
import { Modal } from 'flowbite';
import { EmployeeService } from '../shared/employee.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { config } from '../../../../config';

@Component({
  selector: 'app-employee-add',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss'
})
export class EmployeeAddComponent {
  private employeeService = inject(EmployeeService);
  public employees : Employee[] = [];
  public errors: any = null;
  public apiFilesUrl = config.API_PUBLIC_FILES_URL;

  modal: Modal | null = null;

  addEmployeeForm = new FormGroup({
    employees: new FormControl<Employee[]>([], { nonNullable: true, validators: [Validators.required] }),
  });

  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('add-employee-modal') as HTMLElement);
    });
  }
  openModal() {
    this.modal?.show();
  }
  closeModal() {
    this.modal?.hide();
  }

  searchEmployee(event: any) {
    if (event.target.value.length > 2) {
      this.employeeService.search(event.target.value);
    }
  }

  addEmployee(employee: Employee) {
    if (this.addEmployeeForm.value.employees) {
      const employees = this.addEmployeeForm.value.employees as Employee[];
      if (!employees.find((e: Employee) => e.id === employee.id)) {
        employees.push(employee);
        this.addEmployeeForm.patchValue({ employees });
      }
    } else {
      this.addEmployeeForm.patchValue({ employees: [employee] });
    }
    console.log(this.addEmployeeForm.value.employees);
  }

  removeEmployee(employee: Employee) {
    if (this.addEmployeeForm.value.employees) {
      const employees = this.addEmployeeForm.value.employees as Employee[];
      const index = employees.findIndex((e: Employee) => e.id === employee.id);
      if (index !== -1) {
        employees.splice(index, 1);
        this.addEmployeeForm.patchValue({ employees });
      }
    }
  }

  storeEmployees() {

  }
}
