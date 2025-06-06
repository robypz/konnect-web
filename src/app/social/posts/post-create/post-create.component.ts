import { afterNextRender, Component, computed, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from 'flowbite';
import { PostService } from '../shared/post.service';
import { FormGroupToFormDataService } from '../../../core/libs/form-group-to-form-data.service';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss'
})
export class PostCreateComponent {
  modal: Modal | null = null;

  proyectId = input<string>();
  employeeId = input<string>();

  private postService = inject(PostService);
  private post = computed(() => this.postService.post());
  private error = computed(() => this.postService.error());

  createPostForm = new FormGroup({
    content: new FormControl('',[Validators.required]),
    media: new FormControl<FileList|null>(null),
    proyect_id: new FormControl(''),
    employee_id: new FormControl('',[Validators.required])
  });

  constructor() {
    afterNextRender(() => {
      this.modal = new Modal(document.getElementById('post-create-modal') as HTMLElement);
    });
    effect(() => {
      if (this.proyectId() !== this.createPostForm.get('proyect_id')?.value) {
        this.createPostForm.get('proyect_id')?.setValue(this.proyectId() as string);
      }
      if (this.employeeId() !== this.createPostForm.get('proyect_id')?.value) {
        this.createPostForm.get('employee_id')?.setValue(this.employeeId() as string);
      }
      if (this.post() !== null) {
        this.createPostForm.reset();
        this.closeModal();
      }
    });
  }
  openModal() {
    this.modal?.show();
  }
  closeModal() {
    this.modal?.hide();
  }

  onMediaSelected(event : Event) {
    this.createPostForm.get('media')?.setValue((event.target as HTMLInputElement).files);
  }

  create() {
    if (this.createPostForm.valid) {
      this.postService.store(FormGroupToFormDataService.convert(this.createPostForm));
    }else{
      console.error('Form is invalid', this.createPostForm.errors);
    }
    
  }
}
