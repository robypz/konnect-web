import { Component, input, model } from '@angular/core';
import { Employee } from '../../../work/employees/shared/employee.model';
import { config } from '../../../../../config';


@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  _employee = input<Employee>();
  apiFilesUrl = config.API_PUBLIC_FILES_URL;

  selectedEmployee = model<Employee>();

  public get employee() : Employee {
    return this._employee() as Employee;
  }

  selectEmployee(employee : Employee){
    this.selectedEmployee.set({...employee});
  }


}
