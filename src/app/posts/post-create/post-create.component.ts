import { afterNextRender, Component, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Modal } from 'flowbite';
import { User } from '../../core/models/user.model';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent {
  private postService = inject(PostService);
  

  proyectId = input<string>();
  employeeId = input<string>();

  createPostForm = new FormGroup({
    content: new FormControl(''),
    media: new FormControl<File[]>([]),
    proyect_id: new FormControl(''),
    employee_id: new FormControl('')
  });

  modal: Modal | null = null;
  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('post-create-modal') as HTMLElement);
    });
    effect(() => {
      if (this.proyectId()) {
        this.createPostForm.get('proyect_id')?.setValue(this.proyectId() as string);
      }
      if (this.employeeId()) {
        this.createPostForm.get('employee_id')?.setValue(this.employeeId() as string);
      }
    });
  }
  openModal() {
    this.modal?.show();
  }
  closeModal() {
    this.modal?.hide();
  }

  onSubmit() {

  }
}
