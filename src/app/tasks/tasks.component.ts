import { Component, computed, inject } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { AuthService } from '../auth/shared/auth.service';

@Component({
  selector: 'app-tasks',
  imports: [TaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  private authService = inject(AuthService);
  private user = computed(()=>this.authService.user());

}
