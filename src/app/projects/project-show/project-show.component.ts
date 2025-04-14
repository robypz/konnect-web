import { Component } from '@angular/core';
import { ProjectNavbarComponent } from "../project-navbar/project-navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-project-show',
  imports: [ProjectNavbarComponent,RouterOutlet],
  templateUrl: './project-show.component.html',
  styleUrl: './project-show.component.scss'
})
export class ProjectShowComponent {

}
