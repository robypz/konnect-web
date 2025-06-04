import { Component, computed, inject } from '@angular/core';
import { ContactComponent } from "./contact/contact.component";
import { EmployeeService } from '../../employees/shared/employee.service';
import { Employee } from '../../employees/shared/employee.model';

@Component({
  selector: 'app-contacts',
  imports: [ContactComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  private employeeService = inject(EmployeeService);
  private _employees = computed(()=> this.employeeService.employees());
  
  public get employees() : Employee[] {
    return this._employees() as Employee[];
  }

  constructor(){
    this.employeeService.index();
  }
  
}
