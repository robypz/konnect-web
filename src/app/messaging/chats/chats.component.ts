import { Component, effect, signal } from '@angular/core';
import { ContactsComponent } from "../contacts/contacts.component";
import { Employee } from '../../work/employees/shared/employee.model';

@Component({
  selector: 'app-chats',
  imports: [ContactsComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent {
  private employee$ = signal<Employee | null>(null)


  public set setEmployee(e: Employee) {
    this.employee$.set(e);
  }

  public get employee() {
    return this.employee$() as Employee;
  }

  constructor() {
    effect(() => {

    })
  }

}
