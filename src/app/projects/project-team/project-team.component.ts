import { Component } from '@angular/core';
import { EmployeeComponent } from "../../employees/employee/employee.component";

@Component({
  selector: 'app-project-team',
  imports: [EmployeeComponent],
  templateUrl: './project-team.component.html',
  styleUrl: './project-team.component.scss'
})
export class ProjectTeamComponent {

}
