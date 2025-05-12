import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-guest-layout',
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './guest-layout.component.html',
  styleUrl: './guest-layout.component.scss'
})
export class GuestLayoutComponent {

}
