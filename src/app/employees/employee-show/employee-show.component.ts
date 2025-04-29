import { Component, computed, effect, inject, Input } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { config } from '../../../../config';

@Component({
  selector: 'app-employee-show',
  imports: [],
  templateUrl: './employee-show.component.html',
  styleUrl: './employee-show.component.scss'
})
export class EmployeeShowComponent {
  private employeeService = inject(EmployeeService);
  private _employee = computed(() => this.employeeService.employee());
  public employee : Employee | null = null;
  public apiFilesUrl = config.API_PUBLIC_FILES_URL;
  @Input()
  set id(id: String) {
    this.employeeService.show(id);
  }

  constructor() {
    effect(() => {
      if (this._employee()) {
        this.employee = this._employee();
      }
    });
  }
}
