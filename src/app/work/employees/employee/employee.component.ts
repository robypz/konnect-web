import { Component, input } from '@angular/core';
import { Employee } from '../shared/employee.model';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { config } from '../../../../../config';

@Component({
  selector: 'app-employee',
  imports: [DatePipe,RouterLink,NgOptimizedImage],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  employee = input<Employee>();
  apiFilesUrl = config.API_PUBLIC_FILES_URL;

  getProfilePhotoSrcSet(): { src: string; width: number }[] {
  const base = this.apiFilesUrl + this.employee()?.profile_photo;
  return [32, 64, 128].map(size => ({
    src: `${base}-${size}w.jpg`,
    width: size
  }));
}
}
