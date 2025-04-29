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
  private errors = signal<string[]>([]);

  get projects(): Signal<Project[]> {
    return this._projects;
  }

  get project(): Signal<Project | null> {
    return this._project;
  }

  constructor() { }

  index(){
    this.http.get<Project[]>('/api/projects').subscribe({
      next: (projects) => {
        this._projects.set(projects);
        this.errors.set([]);
      },
      error: (error) => {
        this.errors.set([error.errors]);
      }
    });
  }

  show(id: string){
    this.http.get<Project>(`/api/projects/${id}`).subscribe({
      next: (project) => {
        this._project.set(project);
        this.errors.set([]);
      },
      error: (error) => {
        this.errors.set([error.errors]);
      }
    });
  }

  store(project: Project){
    this.http.post<Project>('/api/projects', project).subscribe({
      next: (project) => {
        this._projects.update((projects) => [...projects, project]);
        this.errors.set([]);
      },
      error: (error) => {
        this.errors.set([error.errors]);
      }
    });
  }

  update(id: string, project: Project){
    this.http.put<Project>(`/api/projects/${id}`, project).subscribe({
      next: (project) => {
        this._projects.update((projects) => projects.map(p => p.id === project.id ? project : p));
        this.errors.set([]);
      },
      error: (error) => {
        this.errors.set([error.errors]);
      }
    });
  }
}
