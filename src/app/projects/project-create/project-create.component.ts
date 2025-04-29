import { afterNextRender, Component, computed, effect, inject } from '@angular/core';
import { Modal } from 'flowbite';
import { ProjectService } from '../shared/project.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../employees/shared/employee.service';
import { Employee } from '../../employees/shared/employee.model';
import { config } from '../../../../config';
import { DepartmentService } from '../../deparments/shared/department.service';
@Component({
  selector: 'app-project-create',
  imports: [ReactiveFormsModule],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.scss'
})
export class ProjectCreateComponent {
  private projectService = inject(ProjectService);
  private _project = computed(() => this.projectService.project());
  private _errors = computed(() => this.projectService.errors());
  public errors :any = null;

  private employeeService = inject(EmployeeService);
  private _employees = computed(() => this.employeeService.employees());
  public employees: Employee[] = [];

  public apiFilesUrl = config.API_PUBLIC_FILES_URL;

  createProjectForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    status: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password_confirmation: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    deadline: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    employees: new FormControl<Employee[]>([], { nonNullable: true, validators: [Validators.required] }),
  });

  modal: Modal | null = null;
  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('create-project-modal') as HTMLElement);
    });
    effect(() => {
      if (this._project() !== null) {
        this.projectService.index();
      }
      if (this._employees() !== this.employees) {
        this.employees = this._employees();
        console.log(this.employees);
      }
      if (this._errors() !== this.errors) {
        this.errors = this._errors();
        console.log(this.errors);
      }
    });
  }
  openModal() {
    this.modal?.show();
  }
  closeModal() {
    this.modal?.hide();
  }

  addEmployee(employee: Employee) {
    if (this.createProjectForm.value.employees) {
      const employees = this.createProjectForm.value.employees as Employee[];
      if (!employees.find((e: Employee) => e.id === employee.id)) {
        employees.push(employee);
        this.createProjectForm.patchValue({ employees });
      }
    } else {
      this.createProjectForm.patchValue({ employees: [employee] });
    }
    console.log(this.createProjectForm.value.employees);
  }

  searchEmployee(event: any) {
    if (event.target.value.length > 2) {
      this.employeeService.search(event.target.value);
    }

  }

  createProject() {
    if (this.createProjectForm.valid) {
      this.projectService.store(this.createProjectForm.value);
    }
  }

}
