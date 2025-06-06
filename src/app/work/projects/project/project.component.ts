import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../shared/project.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [RouterLink,DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  project = input<Project>();
}
