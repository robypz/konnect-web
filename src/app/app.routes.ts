import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { authGuard } from './core/guards/auth.guard';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProjectIndexComponent } from './work/projects/project-index/project-index.component';
import { ProjectShowComponent } from './work/projects/project-show/project-show.component';
import { MessagesComponent } from './messaging/messages/messages.component';
import { TaskIndexComponent } from './work/tasks/task-index/task-index.component';
import { EventIndexComponent } from './work/events/event-index/event-index.component';
import { EmployeeIndexComponent } from './work/employees/employee-index/employee-index.component';
import { EmployeeShowComponent } from './work/employees/employee-show/employee-show.component';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { SigninComponent } from './core/auth/signin/signin.component';
import { SignupComponent } from './core/auth/signup/signup.component';
import { ForgotPasswordComponent } from './core/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './core/auth/reset-password/reset-password.component';

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
    canActivate : [authGuard]
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
