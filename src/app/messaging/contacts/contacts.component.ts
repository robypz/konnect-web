import { Component, computed, effect, inject, input, model, signal, } from '@angular/core';
import { ContactComponent } from "./contact/contact.component";
import { EmployeeService } from '../../work/employees/shared/employee.service';
import { Employee } from '../../work/employees/shared/employee.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  imports: [ContactComponent, ReactiveFormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  private employeeService = inject(EmployeeService);
  private _employees = computed(() => this.employeeService.employees());

  selectedEmployee = model<Employee>();

  searchEmployeeForm = new FormGroup({
    search: new FormControl('', [Validators.minLength(3)]),
  });

  public get employees(): Employee[] {
    return this._employees() as Employee[];
  }

  constructor() {
    effect(()=>{
      if (this._employees()) {
        console.log(this.employees);
      }
    })
  }

  search(event : any) {
    var search = (document.getElementById('contacts') as HTMLElement)
    if (event.target.value.length > 2) {
      search.classList.toggle('hidden');
      this.employeeService.search(event.target.value);
    }else{
      search.classList.toggle('hidden');
    }
  }


}
