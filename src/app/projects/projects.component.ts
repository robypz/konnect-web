import { Component, computed, effect, inject, input } from '@angular/core';
import { ProjectComponent } from "./project/project.component";
import { ProjectService } from './shared/project.service';
import { EmployeeService } from '../employees/shared/employee.service';
import { Project } from './shared/project.model';

@Component({
  selector: 'app-projects',
  imports: [ProjectComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  public employeeId = input<string>();

  private projectService = inject(ProjectService);
  private _projects = computed(()=>this.projectService.projects());

  
  get projects() : Project[] {
    return this._projects();
  }
  
  constructor(){
    effect(()=>{
      if (this.employeeId()) {
        this.projectService.byEmployee(this.employeeId() as string);
      }
    });
  }
}
