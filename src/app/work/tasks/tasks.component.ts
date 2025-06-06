import { Component, computed, effect, inject, input, model } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { AuthService } from '../auth/shared/auth.service';
import { TaskService } from './shared/task.service';
import { Task } from './shared/task.model';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  public employeeId = input<string>();
  private taskService = inject(TaskService);
  private _tasks = computed(()=>this.taskService.tasks());
  public tasks! : Task[];
  public tasksCount = model<number>(0);
  constructor(){
    effect(()=>{
      if (this.employeeId()) {
        this.taskService.byEmployee(this.employeeId() as string);
      }
      if (this._tasks()) {
        this.tasks = this._tasks();
        this.tasksCount.set(this.tasks.length);
      }
    })
  }
}
