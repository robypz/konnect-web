import { Component, input } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { config } from '../../../../config';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [DatePipe,RouterLink],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  employee = input<Employee>();
  apiFilesUrl = config.API_PUBLIC_FILES_URL;
}
