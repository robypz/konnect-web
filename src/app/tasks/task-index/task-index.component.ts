import { Component, Input, OnInit } from '@angular/core';
import { TaskComponent } from "../task/task.component";
import { TaskCreateComponent } from "../task-create/task-create.component";

@Component({
  selector: 'app-task-index',
  imports: [TaskComponent, TaskCreateComponent],
  templateUrl: './task-index.component.html',
  styleUrl: './task-index.component.scss'
})
export class TaskIndexComponent implements OnInit {
  public projectId: string = '';

  @Input()
  set id(id: string) {
    this.projectId = id;
  }


  ngOnInit() {
    console.log('TaskIndexComponent initialized with projectId:', this.projectId);
  }
}
