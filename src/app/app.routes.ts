import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { EventsComponent } from './events/events.component';
import { ProjectIndexComponent } from './projects/project-index/project-index.component';
import { ProjectShowComponent } from './projects/project-show/project-show.component';
import { PostIndexComponent } from './posts/post-index/post-index.component';
import { TaskIndexComponent } from './tasks/task-index/task-index.component';
import { TeamIndexComponent } from './team/team-index/team-index.component';
import { FileIndexComponent } from './files/file-index/file-index.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'dashboard', component: DashboardComponent,
    children:[
      {path: 'projects', component: ProjectIndexComponent},
      {path: 'projects/:id', component: ProjectShowComponent,
        children:[
          {path: 'posts', component: PostIndexComponent},
          {path: 'tasks', component: TaskIndexComponent},
          {path: 'team', component: TeamIndexComponent},
          {path: 'files', component: FileIndexComponent},
        ],
      },
    ],
  },
];
