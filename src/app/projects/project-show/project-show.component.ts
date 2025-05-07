import { afterNextRender, Component, computed, effect, inject, Input } from '@angular/core';
import { ProjectNavbarComponent } from "../project-navbar/project-navbar.component";
import { RouterOutlet } from '@angular/router';
import { ProjectService } from '../shared/project.service';
import { Project } from '../shared/project.model';
import { DatePipe } from '@angular/common';
import { ProjectEditComponent } from "../project-edit/project-edit.component";
import { config } from '../../../../config';
import { Tabs } from 'flowbite';
import { ProjectPostsComponent } from "../project-posts/project-posts.component";
import { ProjectFilesComponent } from "../project-files/project-files.component";
import { ProjectTeamComponent } from "../project-team/project-team.component";
import { ProjectTasksComponent } from "../project-tasks/project-tasks.component";

@Component({
  selector: 'app-project-show',
  imports: [DatePipe, ProjectEditComponent, ProjectPostsComponent, ProjectFilesComponent, ProjectTeamComponent, ProjectTasksComponent],
  templateUrl: './project-show.component.html',
  styleUrl: './project-show.component.scss'
})
export class ProjectShowComponent {
  private projectService = inject(ProjectService);
  private _project = computed(() => this.projectService.project());
  public project: Project | null = null;
  public apiFilesUrl = config.API_PUBLIC_FILES_URL;

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
    afterNextRender(() => {
      if (this.project) {
        const tabElement = document.getElementById('default-styled-tab') as HTMLElement;
        const tabElements = [
          {
            id: 'posts',
            triggerEl: document.getElementById('posts-tab') as HTMLElement,
            targetEl: document.getElementById('styled-posts') as HTMLElement,
          },
          {
            id: 'tasks',
            triggerEl: document.getElementById('tasks-tab') as HTMLElement,
            targetEl: document.getElementById('styled-tasks') as HTMLElement,
          },
          {
            id: 'team',
            triggerEl: document.getElementById('team-tab') as HTMLElement,
            targetEl: document.getElementById('styled-team') as HTMLElement,
          },
          {
            id: 'files',
            triggerEl: document.getElementById('files-tab') as HTMLElement,
            targetEl: document.getElementById('styled-files') as HTMLElement,
          },
        ];

        const tab = new Tabs(tabElement, tabElements);
      }

    }
    );
  }

}
