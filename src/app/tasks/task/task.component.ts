import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

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
