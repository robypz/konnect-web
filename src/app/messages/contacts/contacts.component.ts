import { Component } from '@angular/core';
import { ContactComponent } from "./contact/contact.component";

@Component({
  selector: 'app-contacts',
  imports: [ContactComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

}
