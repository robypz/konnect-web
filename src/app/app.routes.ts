import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { EventsComponent } from './events/events.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'dashboard', component: DashboardComponent},

  {path: 'projects', component: ProjectsComponent},

  {path: 'tasks', component: TasksComponent},

  {path: 'events', component: EventsComponent},
];
