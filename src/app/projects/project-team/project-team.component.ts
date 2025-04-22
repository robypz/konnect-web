import { Component } from '@angular/core';
import { EmployeeComponent } from "../../employees/employee/employee.component";
import { EmployeeAddComponent } from "../../employees/employee-add/employee-add.component";

@Component({
  selector: 'app-project-team',
  imports: [EmployeeComponent, EmployeeAddComponent],
  templateUrl: './project-team.component.html',
  styleUrl: './project-team.component.scss'
})
export class ProjectTeamComponent {

}
