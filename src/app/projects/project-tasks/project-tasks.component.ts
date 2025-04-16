import { Component, input } from '@angular/core';
import { TaskComponent } from "../../tasks/task/task.component";
import { TaskCreateComponent } from "../../tasks/task-create/task-create.component";
import { Task } from '../../tasks/shared/task.model';

@Component({
  selector: 'app-project-tasks',
  imports: [TaskComponent, TaskCreateComponent],
  templateUrl: './project-tasks.component.html',
  styleUrl: './project-tasks.component.scss'
})
export class ProjectTasksComponent {

}
