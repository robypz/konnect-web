import { Component } from '@angular/core';
import { FileAddComponent } from "../../files/file-add/file-add.component";

@Component({
  selector: 'app-project-files',
  imports: [FileAddComponent],
  templateUrl: './project-files.component.html',
  styleUrl: './project-files.component.scss'
})
export class ProjectFilesComponent {

}
