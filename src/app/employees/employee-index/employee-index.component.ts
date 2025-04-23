import { Component } from '@angular/core';
import { EmployeeCreateComponent } from "../employee-create/employee-create.component";
import { EmployeeComponent } from "../employee/employee.component";

@Component({
  selector: 'app-employee-index',
  imports: [EmployeeCreateComponent, EmployeeComponent],
  templateUrl: './employee-index.component.html',
  styleUrl: './employee-index.component.scss'
})
export class EmployeeIndexComponent {

}
