import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-index',
  imports: [],
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
