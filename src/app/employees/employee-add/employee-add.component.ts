import { afterNextRender, Component, computed, effect, inject, input } from '@angular/core';
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
  public searchEmployees = computed(() => this.employeeService.employees());
  public employees = input<Employee[]>();
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
    effect(() => {
      if (this.employees() != undefined) {
        this.addEmployeeForm.patchValue({
          employees: this.employees()
        });
      }
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
    this.addEmployeeForm.patchValue({
      employees: this.employeeService.addEmployee(
        employee,
        this.addEmployeeForm.value.employees as Employee[]
      )
    });
  }

  removeEmployee(employee: Employee) {
    this.addEmployeeForm.patchValue({
      employees: this.employeeService.removeEmployee(
        employee,
        this.addEmployeeForm.value.employees as Employee[]
      )
    });
  }

  storeEmployees() {

  }
}
