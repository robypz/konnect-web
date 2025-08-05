import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/shared/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private authService = inject(AuthService);
  hasAnyRole(roles: string[]): boolean {
    return this.authService.hasAnyRole(roles);
  }
}
