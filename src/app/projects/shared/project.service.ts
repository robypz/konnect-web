import { inject, Injectable, signal, Signal } from '@angular/core';
import { Project } from './project.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private http = inject(HttpClient);

  private _projects = signal<Project[]>([]);
  private _project = signal<Project | null>(null);
  private _errors = signal<any>(null);

  get projects(): Signal<Project[]> {
    return this._projects;
  }

  get project(): Signal<Project | null> {
    return this._project;
  }

  get errors(): Signal<any> {
    return this._errors;
  }

  constructor() { }

  index(){
    this.http.get<Project[]>('/api/projects').subscribe({
      next: (projects) => {
        this._projects.set(projects);
        this._errors.set([]);
      },
      error: (error) => {
        this._errors.set([error.errors]);
      }
    });
  }

  show(id: string){
    this.http.get<Project>(`/api/projects/${id}`).subscribe({
      next: (project) => {
        this._project.set(project);
        this._errors.set([]);
      },
      error: (error) => {
        this._errors.set([error.errors]);
      }
    });
  }

  store(body: any){
    this.http.post<Project>('/api/projects', body).subscribe({
      next: (project) => {
        this._projects.update((projects) => [...projects, project]);
        this._errors.set([]);
      },
      error: (error) => {
        this._errors.set([error.errors]);
      }
    });
  }

  update(id: string, project: Project){
    this.http.put<Project>(`/api/projects/${id}`, project).subscribe({
      next: (project) => {
        this._projects.update((projects) => projects.map(p => p.id === project.id ? project : p));
        this._errors.set([]);
      },
      error: (error) => {
        this._errors.set([error.errors]);
      }
    });
  }
}
