import { Component, input } from '@angular/core';
import { EmployeeComponent } from "../../employees/employee/employee.component";
import { EmployeeAddComponent } from "../../employees/employee-add/employee-add.component";
import { Employee } from '../../employees/shared/employee.model';

@Component({
  selector: 'app-project-team',
  imports: [EmployeeComponent, EmployeeAddComponent],
  templateUrl: './project-team.component.html',
  styleUrl: './project-team.component.scss'
})
export class ProjectTeamComponent {
  employees = input<Employee[]>();
}
