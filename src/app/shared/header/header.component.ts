import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { User } from '../../core/models/user.model';
import { config } from '../../../../config';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private  _user = computed(() => this.authService.user());
  public user!: User | null;
  private _error = computed(() => this.authService.error());
  
  public apiFilesUrl = config.API_PUBLIC_FILES_URL;

  constructor() {
    effect(() => {
      if (this._user()) {
        this.user = this._user();
      }
      if (this._error() != null) {
        console.log(this._error());
      }
    });
  }

  ngOnInit(): void {
    this.authService.getUser();
  }
}
