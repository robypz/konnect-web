import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { ProjectComponent } from "../project/project.component";
import { ProjectCreateComponent } from "../project-create/project-create.component";
import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project.model';

@Component({
  selector: 'app-project-index',
  imports: [ProjectComponent, ProjectCreateComponent],
  templateUrl: './project-index.component.html',
  styleUrl: './project-index.component.scss'
})
export class ProjectIndexComponent implements OnInit {
  private projectService = inject(ProjectService);
  private _projects = computed(() => this.projectService.projects());
  public projects : Project[] = [];
  private _errors = computed(() => this.projectService.errors());
  public errors : any = null;

  constructor() {
    effect(() => {
      if (this._projects() !== this.projects) {
        this.projects = this._projects();
      }
      if (this._errors() !== null) {
        //console.error(this._errors());
      }
    });
  }

  ngOnInit(): void {
    this.projectService.index();
  }
}
