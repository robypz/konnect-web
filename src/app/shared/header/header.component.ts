import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { User } from '../../core/models/user.model';
import { config } from '../../../../config';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private  _user = computed(() => this.authService.user());
  public user: User | null = null;
  private _error = computed(() => this.authService.error());
  
  public apiFilesUrl = config.API_PUBLIC_FILES_URL;

  constructor() {
    this.authService.getUser();
    effect(() => {
      if (this._user()) {
        this.user = this._user();
      }
      if (this._error() != null) {
        console.log(this._error());
      }
    });
  }
}
