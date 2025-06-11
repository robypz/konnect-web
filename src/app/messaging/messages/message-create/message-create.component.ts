import { Component, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-message-create',
  imports: [ReactiveFormsModule],
  templateUrl: './message-create.component.html',
  styleUrl: './message-create.component.scss'
})
export class MessageCreateComponent {
  chatId = input<string>();
  employeeId = input<string>();

  private messageService = inject(MessageService);

  createMessageForm = new FormGroup({
    chat_id: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    employee_id: new FormControl('', [Validators.required]),
  });

  constructor() {
    effect(() => {
      if (this.chatId() && this.employeeId()) {
        this.createMessageForm.patchValue(
          {
            chat_id: this.chatId(),
            employee_id: this.employeeId()
          }
        );
      }
    });
  }

  create(){
    if (this.createMessageForm.valid) {
      this.messageService.store(this.createMessageForm.value);
    }
  }

}
