import { afterNextRender, Component, computed, effect, inject, input, Input } from '@angular/core';
import { ProjectService } from '../shared/project.service';
import { CategoryService } from '../../categories/shared/category.service';
import { Category } from '../../categories/shared/category.model';
import { Status } from '../../core/models/status.model';
import { StatusService } from '../../core/services/status.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../employees/shared/employee.model';
import { Modal } from 'flowbite';
import { config } from '../../../../config';
import { Project } from '../shared/project.model';

@Component({
  selector: 'app-project-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss'
})
export class ProjectEditComponent {
  private projectService = inject(ProjectService);
  private _project = computed(() => this.projectService.project());
  private _errors = computed(() => this.projectService.errors());
  public errors: any = null;
  public project: Project | null = null;

  /*private employeeService = inject(EmployeeService);
  private _employees = computed(() => this.employeeService.employees());
  public employees: Employee[] = [];*/

  /*private deparmentService = inject(DepartmentService);
  private _deparments = computed(() => this.deparmentService.departments());
  public deparments: Department[] = [];*/

  private categoryService = inject(CategoryService);
  private _categories = computed(() => this.categoryService.categories());
  public categories: Category[] = [];

  private statusService = inject(StatusService);
  private _statuses = computed(() => this.statusService.statuses());
  public statuses: Status[] = [];

  public apiFilesUrl = config.API_PUBLIC_FILES_URL;

  editProjectForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    progress: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    status_id: new FormControl<string|null>(null, { nonNullable: true, validators: [Validators.required] }),
    deadline: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    category_id: new FormControl<string|null>(null, { nonNullable: true, validators: [Validators.required] }),
    start_date: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    //employees: new FormControl<Employee[]>([], { nonNullable: true, validators: [Validators.required] }),
  });

  modal: Modal | null = null;
  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('edit-project-modal') as HTMLElement);
    });
    effect(() => {
      if (this._project() !== null) {
        this.project = this._project();
        this.editProjectForm.patchValue({
          name: this.project?.name,
          description: this.project?.description,
          progress: this.project?.progress,
          status_id: this.project?.status_id,
          deadline: this.project?.deadline.toString().split('T')[0],
          category_id: this.project?.category_id,
          start_date: this.project?.start_date.toString().split('T')[0],
          //employees: this.project.employees
        });
      }
      /*if (this._employees() !== this.employees) {
        this.employees = this._employees();
      }*/

      /*if (this._deparments() !== this.deparments) {
        this.deparments = this._deparments();
      }*/

      if (this._categories() !== this.categories) {
        this.categories = this._categories();
      }

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
    this.categoryService.index();
  }


  openModal() {
    this.modal?.show();
  }
  closeModal() {
    this.modal?.hide();
  }

  /*addEmployee(employee: Employee) {
    if (this.editProjectForm.value.employees) {
      const employees = this.editProjectForm.value.employees as Employee[];
      if (!employees.find((e: Employee) => e.id === employee.id)) {
        employees.push(employee);
        this.editProjectForm.patchValue({ employees });
      }
    } else {
      this.editProjectForm.patchValue({ employees: [employee] });
    }
    console.log(this.editProjectForm.value.employees);
  }*/

  /*removeEmployee(employee: Employee) {
    if (this.editProjectForm.value.employees) {
      const employees = this.editProjectForm.value.employees as Employee[];
      const index = employees.findIndex((e: Employee) => e.id === employee.id);
      if (index !== -1) {
        employees.splice(index, 1);
        this.editProjectForm.patchValue({ employees });
      }
    }
  }*/

  /*searchEmployee(event: any) {
    if (event.target.value.length > 2) {
      this.employeeService.search(event.target.value);
    }

  }*/

  editProject() {
    if (this.editProjectForm.valid) {
      this.projectService.update(this.editProjectForm.value, this.project?.id);
      //console.log(this.editProjectForm.value);
    } else {
      console.log(this.editProjectForm.errors);
    }
  }
}
