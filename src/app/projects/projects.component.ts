import { Component, computed, effect, inject, input, model } from '@angular/core';
import { ProjectComponent } from "./project/project.component";
import { ProjectService } from './shared/project.service';
import { Project } from './shared/project.model';

@Component({
  selector: 'app-projects',
  imports: [ProjectComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  public employeeId = input<string>();
  projectCount = model<number>(0);


  private projectService = inject(ProjectService);
  private _projects = computed(()=>this.projectService.projects());

  public projects! : Project[];
  
  constructor(){
    effect(()=>{
      if (this.employeeId()) {
        this.projectService.byEmployee(this.employeeId() as string);
      }
      if (this._projects() !== this.projects) {
        this.projects = this._projects();
        this.projectCount.set(this.projects.length);
      }
    });
  }
}
