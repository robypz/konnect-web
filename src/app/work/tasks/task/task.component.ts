import { Component, effect, input } from '@angular/core';
import { Task } from '../shared/task.model';
import { DatePipe } from '@angular/common';
import { config } from '../../../../config';

@Component({
  selector: 'app-task',
  imports: [DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  _task = input<Task>();
  task!: Task;
  apiFilesUrl = config.API_PUBLIC_FILES_URL;
  constructor(){
    effect(()=>{
      if (this._task() !== null) {
        this.task = this._task() as Task;
      }
    });
  }

  toggleTaskStatus(id: string, tasklId: string) {
    const taskElement = document.getElementById('task-'+tasklId+'-title') as HTMLInputElement;
    const taskLabel = document.getElementById('task-'+tasklId+'-label') as HTMLInputElement;
    if(taskElement?.checked){
      taskLabel?.classList.add('line-through');
    }
    else{
      taskLabel?.classList.remove('line-through');
    }
  }
}
