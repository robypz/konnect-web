import { Component, computed, effect, inject, Input } from '@angular/core';
import { ProjectNavbarComponent } from "../project-navbar/project-navbar.component";
import { RouterOutlet } from '@angular/router';
import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project.model';
import { DatePipe } from '@angular/common';
import { ProjectEditComponent } from "../project-edit/project-edit.component";

@Component({
  selector: 'app-project-show',
  imports: [ProjectNavbarComponent, RouterOutlet, DatePipe, ProjectEditComponent],
  templateUrl: './project-show.component.html',
  styleUrl: './project-show.component.scss'
})
export class ProjectShowComponent {
  private projectService = inject(ProjectService);
  private _project = computed(() => this.projectService.project());
  public project: Project | null = null;

  @Input()
  set id(id: string) {
    this.projectService.show(id);
  }

  constructor() {
    effect(() => {
      if (this._project() !== null) {
        this.project = this._project();
        console.log(this.project);
      }
    });
  }

}
