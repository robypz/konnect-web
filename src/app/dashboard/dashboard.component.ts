import { afterNextRender, Component, computed, effect, inject, OnInit } from '@angular/core';
import { Tabs } from 'flowbite';
import { PostsComponent } from '../posts/posts.component';
import { ProjectsComponent } from "../projects/projects.component";
import { TasksComponent } from "../tasks/tasks.component";
import { EventsComponent } from "../events/events.component";
import { AuthService } from '../auth/shared/auth.service';
import { User } from '../core/models/user.model';
@Component({
  selector: 'app-dashboard',
  imports: [PostsComponent, ProjectsComponent, TasksComponent, EventsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private _user = computed(() => this.authService.user());
  public user!: User |null;
  private _error = computed(() => this.authService.error());

  public projectCount = 0;
  public taskCount = 0;
  public eventCount = 0;
  public postCount = 0;

  constructor() {
    /*afterNextRender(() => {
      const tabElement = document.getElementById('default-styled-tab') as HTMLElement;
      const tabElements = [
        {
          id: 'profile',
          triggerEl: document.getElementById('profile-styled-tab') as HTMLElement,
          targetEl: document.getElementById('styled-profile') as HTMLElement,
        },
        {
          id: 'dashboard',
          triggerEl: document.getElementById('dashboard-styled-tab') as HTMLElement,
          targetEl: document.getElementById('styled-dashboard') as HTMLElement,
        },
        {
          id: 'settings',
          triggerEl: document.getElementById('settings-styled-tab') as HTMLElement,
          targetEl: document.getElementById('styled-settings') as HTMLElement,
        },
        {
          id: 'contacts',
          triggerEl: document.getElementById('contacts-styled-tab') as HTMLElement,
          targetEl: document.getElementById('styled-contacts') as HTMLElement,
        },
      ];

      const tab = new Tabs(tabElement, tabElements);
    }
    );*/
    effect(() => {
      if (this._user()) {
        this.user = this._user();
      }
      if (this._error() != null) {
        console.log(this._error());
      }
    });
  }

  ngOnInit(): void {
    const tabElement = document.getElementById('default-styled-tab') as HTMLElement;
    const tabElements = [
      {
        id: 'profile',
        triggerEl: document.getElementById('profile-styled-tab') as HTMLElement,
        targetEl: document.getElementById('styled-profile') as HTMLElement,
      },
      {
        id: 'dashboard',
        triggerEl: document.getElementById('dashboard-styled-tab') as HTMLElement,
        targetEl: document.getElementById('styled-dashboard') as HTMLElement,
      },
      {
        id: 'settings',
        triggerEl: document.getElementById('settings-styled-tab') as HTMLElement,
        targetEl: document.getElementById('styled-settings') as HTMLElement,
      },
      {
        id: 'contacts',
        triggerEl: document.getElementById('contacts-styled-tab') as HTMLElement,
        targetEl: document.getElementById('styled-contacts') as HTMLElement,
      },
    ];

    const tab = new Tabs(tabElement, tabElements);
  }
}
