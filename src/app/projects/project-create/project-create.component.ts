import { afterNextRender, Component, computed, effect, inject, OnInit } from '@angular/core';
import { Modal } from 'flowbite';
import { ProjectService } from '../shared/project.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../employees/shared/employee.service';
import { Employee } from '../../employees/shared/employee.model';
import { config } from '../../../../config';
/*import { DepartmentService } from '../../deparments/shared/department.service';
import { Department } from '../../deparments/shared/department.model';*/
import { StatusService } from '../../core/services/status.service';
import { Status } from '../../core/models/status.model';
import { Project } from '../shared/project.model';
@Component({
  selector: 'app-project-create',
  imports: [ReactiveFormsModule],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.scss'
})
export class ProjectCreateComponent implements OnInit {
  private projectService = inject(ProjectService);
  private _project = computed(() => this.projectService.project());
  private _errors = computed(() => this.projectService.errors());
  public errors :any = null;

  private employeeService = inject(EmployeeService);
  private _employees = computed(() => this.employeeService.employees());
  public employees: Employee[] = [];

  /*private deparmentService = inject(DepartmentService);
  private _deparments = computed(() => this.deparmentService.departments());
  public deparments: Department[] = [];*/

  private statusService = inject(StatusService);
  private _statuses = computed(() => this.statusService.statuses());
  public statuses: Status[] = [];

  public apiFilesUrl = config.API_PUBLIC_FILES_URL;

  createProjectForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    progress : new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    status_id: new FormControl(null, { nonNullable: true, validators: [Validators.required] }),
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
      }

      /*if (this._deparments() !== this.deparments) {
        this.deparments = this._deparments();
      }*/

      if (this._statuses() !== this.statuses) {
        this.statuses = this._statuses();
      }

      if (this._errors() !== this.errors) {
        this.errors = this._errors();
      }
    });
  }

  ngOnInit() {
    //this.deparmentService.index();
    this.statusService.index();
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

  removeEmployee(employee: Employee) {
    if (this.createProjectForm.value.employees) {
      const employees = this.createProjectForm.value.employees as Employee[];
      const index = employees.findIndex((e: Employee) => e.id === employee.id);
      if (index !== -1) {
        employees.splice(index, 1);
        this.createProjectForm.patchValue({ employees });
      }
    }
  }

  searchEmployee(event: any) {
    if (event.target.value.length > 2) {
      this.employeeService.search(event.target.value);
    }

  }

  createProject() {
    if (this.createProjectForm.valid) {
      this.projectService.store(this.createProjectForm.value);
      //console.log(this.createProjectForm.value);
    }else{
      console.log(this.createProjectForm.errors);
    }
  }

}
