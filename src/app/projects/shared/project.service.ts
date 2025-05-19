import { inject, Injectable, signal, Signal } from '@angular/core';
import { Project } from './project.model';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../../config';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private http = inject(HttpClient);
  private apiUrl = config.API_URL + '/projects';

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

  index() {
    this.http.get<Project[]>(`${this.apiUrl}`).subscribe({
      next: (projects) => {
        this._projects.set(projects);
      },
      error: (error) => {
        this._errors.set(error);
      }
    });
  }

  show(id: string) {
    this.http.get<Project>(`${this.apiUrl}/` + id).subscribe({
      next: (project) => {
        this._project.set(project);
      },
      error: (error) => {
        this._errors.set([error.errors]);
      }
    });
  }

  store(body: any) {
    this.http.post<Project>(`${this.apiUrl}`, body).subscribe({
      next: (project) => {
        this._projects.update((projects) => [...projects, project]);
      },
      error: (error) => {
        this._errors.set([error.errors]);
        console.error(error);
      }
    });
  }

  update(body: any, id: any) {
    this.http.put<Project>(`${this.apiUrl}/${id}`, body).subscribe({
      next: (project) => {
        this._projects.update((projects) => projects.map(p => p.id === project.id ? project : p));
        this._project.update((p) => ({ ...p, ...project }));
      },
      error: (error) => {
        this._errors.set(error);
        console.error(error);
      }
    });
  }

  updateEmployees(data: any, id: string) {
    this.http.put<Project>(`${this.apiUrl}/updateEmployees/${id}`, data).subscribe({
      next: (project) => {
        this._projects.update((projects) =>
          projects.map(p =>
            p.id === project.id ? { ...p, employees: project.employees } : p
          )
        );
      },
      error: (error) => {
        this._errors.set(error);
        console.error(error);
      }
    });
  }

  addTask(data: any, id: string) {
    this.http.post<Project>(`${this.apiUrl}/${id}/addTask`, data).subscribe({
      next: (project) => {
        // Actualiza la lista de proyectos
        this._projects.update((projects) =>
          projects.map(p => p.id === project.id ? { ...p, tasks: project.tasks } : p)
        );

        // Mantiene las propiedades actuales de _project y solo actualiza las tareas
        this._project.update((currentProject) => currentProject ? { ...currentProject, tasks: project.tasks } : currentProject);
      },
      error: (error) => {
        this._errors.set(error);
        console.error(error);
      }
    });
  }

  byEmployee(employeeId: string) {
    this.http.get<Project[]>(`${this.apiUrl}/byEmployee/${employeeId}`).subscribe({
      next: (projects) => {
        this._projects.set(projects);
      },
      error: (error) => {
        this._errors.set(error);
      }
    });
  }


}
