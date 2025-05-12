import { afterNextRender, Component, OnInit } from '@angular/core';
import { Tabs } from 'flowbite';
import { PostsComponent } from '../posts/posts.component';
import { ProjectsComponent } from "../projects/projects.component";
import { TasksComponent } from "../tasks/tasks.component";
import { EventsComponent } from "../events/events.component";
@Component({
  selector: 'app-dashboard',
  imports: [PostsComponent, ProjectsComponent, TasksComponent, EventsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

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
