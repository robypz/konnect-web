import { afterNextRender, Component, computed, effect, inject, input } from '@angular/core';
import { Modal } from 'flowbite';
import { ProjectService } from '../../projects/shared/project.service';
import { Project } from '../../projects/shared/project.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StatusService } from '../../core/services/status.service';
import { Status } from '../../core/models/status.model';

@Component({
  selector: 'app-task-create',
  imports: [ReactiveFormsModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss'
})
export class TaskCreateComponent {
  projectId = input<string>();

  private projectService = inject(ProjectService);
  private _project = computed(() => this.projectService.project());
  public project!: Project;

  private statusService = inject(StatusService);
  private _statuses = computed(() => this.statusService.statuses());
  public statuses!: Status[];

  modal: Modal | null = null;

  addTasksForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    employee_id: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    status_id: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    deadline: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('task-create-modal') as HTMLElement);
      this.projectService.index();
    });
    effect(()=>{
      if (this._project != null) {
        this.project = this._project() as Project;
      }
      if (this._statuses != null) {
        this.statuses = this._statuses() as Status[];
      }
    });
  }


  openModal() {
    this.modal?.show();
  }
  closeModal() {
    this.modal?.hide();
  }

  addTasks(){
    if (this.addTasksForm.valid) {
      this.projectService.addTask(this.addTasksForm.value,this.project.id);
    }
  }
}
