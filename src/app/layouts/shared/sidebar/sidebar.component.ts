import { Component, computed, inject } from '@angular/core';
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
  private _user = computed(() => this.authService.user());
  constructor(){
    this.authService.getUser();
  }

  get user() {
    return this._user();
  }



  hasAnyRole(roles: string[]): boolean {
    return this.authService.hasAnyRole(roles);
  }
}
