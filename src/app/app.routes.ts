import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectIndexComponent } from './projects/project-index/project-index.component';
import { ProjectShowComponent } from './projects/project-show/project-show.component';
import { TaskIndexComponent } from './tasks/task-index/task-index.component';
import { ProjectPostsComponent } from './projects/project-posts/project-posts.component';
import { ProjectTasksComponent } from './projects/project-tasks/project-tasks.component';
import { ProjectTeamComponent } from './projects/project-team/project-team.component';
import { ProjectFilesComponent } from './projects/project-files/project-files.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { EventIndexComponent } from './events/event-index/event-index.component';
import { EmployeeIndexComponent } from './employees/employee-index/employee-index.component';
import { EmployeeShowComponent } from './employees/employee-show/employee-show.component';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

export const routes: Routes = [

  {path: 'dashboard', component: DashboardLayoutComponent,
    children:[
      {path: '', component: DashboardComponent},
      {path: 'projects', component: ProjectIndexComponent},
      {path: 'projects/:id', component: ProjectShowComponent,
        /*children:[
          {path: 'posts', component: ProjectPostsComponent},
          {path: 'tasks', component: ProjectTasksComponent},
          {path: 'team', component: ProjectTeamComponent},
          {path: 'files', component: ProjectFilesComponent},
        ],*/
      },

      {path:'messages', component: MessagesComponent},
      {path: 'tasks', component: TaskIndexComponent},
      {path: 'events', component: EventIndexComponent},

      {path: 'employees', component: EmployeeIndexComponent},
      {path: 'employees/:id', component: EmployeeShowComponent},
    ],
  },

  {path:'',component : GuestLayoutComponent,
    children:[
      {path: '', component: HomeComponent},
      {path: 'signin', component: SigninComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'reset-password', component: ResetPasswordComponent},
    ],
  }
];
