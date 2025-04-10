import { Component } from '@angular/core';
import { ProjectComponent } from "../project/project.component";
import { ProjectCreateComponent } from "../project-create/project-create.component";

@Component({
  selector: 'app-project-index',
  imports: [ProjectComponent, ProjectCreateComponent],
  templateUrl: './project-index.component.html',
  styleUrl: './project-index.component.scss'
})
export class ProjectIndexComponent {

}
