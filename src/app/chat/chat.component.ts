import { Component, effect, input } from '@angular/core';
import { MessageComponent } from "../messages/message/message.component";
import { Employee } from '../employees/shared/employee.model';
import { config } from '../../../config';

@Component({
  selector: 'app-chat',
  imports: [MessageComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  employee$ = input<Employee>();

  apiFilesUrl = config.API_PUBLIC_FILES_URL;
  
  public get employee() {
    return this.employee$() as Employee;
  }

  constructor(){
    effect(()=>{
      if (this.employee$()) {
        
      }
    });
  }
  
}
