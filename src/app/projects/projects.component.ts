import { Component, effect, input } from '@angular/core';
import { ProjectComponent } from "./project/project.component";

@Component({
  selector: 'app-projects',
  imports: [ProjectComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  public employeeId = input<string>();
  constructor(){
    effect(()=>{
      if (this.employeeId()) {
        console.log(this.employeeId());
      }
    });
  }
}
