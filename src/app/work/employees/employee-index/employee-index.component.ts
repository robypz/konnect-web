import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { EmployeeCreateComponent } from "../employee-create/employee-create.component";
import { EmployeeComponent } from "../employee/employee.component";
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

@Component({
  selector: 'app-employee-index',
  imports: [EmployeeCreateComponent, EmployeeComponent],
  templateUrl: './employee-index.component.html',
  styleUrl: './employee-index.component.scss'
})
export class EmployeeIndexComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private _employees = computed(() => this.employeeService.employees());
  private _pagination = computed(() => this.employeeService.pagination());
  private _errors = computed(() => this.employeeService.errors());
  public employees: Employee[] = this._employees();

  constructor() {
    effect(() => {
      if (this._employees() !== this.employees) {
        this.employees = this._employees();
        console.log(this.employees);
      }
    });
  }

  ngOnInit(): void {
    this.employeeService.index();
  }
}
