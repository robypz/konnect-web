import { Component, computed, effect, inject, model, OnInit, } from '@angular/core';
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
export class ContactsComponent implements OnInit{
  private employeeService = inject(EmployeeService);
  private _employees = computed(() => this.employeeService.employees());

  private _search : any;

  selectedEmployee = model<Employee>();

  public get employees(): Employee[] {
    return this._employees() as Employee[];
  }

  constructor() {
  }

  ngOnInit(): void {
    this._search = document.getElementById('contacts') as HTMLElement;
  }

  search(event : any) {
    if (event.target.value.length > 2) {
      this._search.classList.toggle('hidden');
      this.employeeService.search(event.target.value);
    }else{
      this._search.classList.toggle('hidden');
    }
  }


}
