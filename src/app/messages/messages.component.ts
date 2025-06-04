import { Component, effect, input, signal } from '@angular/core';
import { ContactsComponent } from "./contacts/contacts.component";
import { ChatComponent } from "./chat/chat.component";
import { Employee } from '../employees/shared/employee.model';

@Component({
  selector: 'app-messages',
  imports: [ContactsComponent, ChatComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {
  private employee$ = signal<Employee|null>(null)

  
  public set employee(e : Employee) {
    this.employee$.set(e);
  }
  
  constructor(){
    effect(()=>{
      console.log(this.employee$())
    });
  }
  
}
