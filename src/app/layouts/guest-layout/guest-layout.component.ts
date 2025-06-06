import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-guest-layout',
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './guest-layout.component.html',
  styleUrl: './guest-layout.component.scss'
})
export class GuestLayoutComponent {

}
