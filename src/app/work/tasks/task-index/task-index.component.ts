import { Component, computed, effect, inject } from '@angular/core';
import { TaskComponent } from "../task/task.component";
import { TaskCreateComponent } from "../task-create/task-create.component";
import { TaskService } from '../shared/task.service';
import { Task } from '../shared/task.model';

@Component({
  selector: 'app-task-index',
  imports: [TaskComponent, TaskCreateComponent],
  templateUrl: './task-index.component.html',
  styleUrl: './task-index.component.scss'
})
export class TaskIndexComponent  {
  private taskService = inject(TaskService);
  private _tasks = computed(() => this.taskService.tasks());
  public tasks : Task[] = [];

  constructor(){
    this.taskService.index();
    effect(()=>{
      if (this._tasks()) {
        this.tasks = this._tasks();
      }
    })
  }
}
