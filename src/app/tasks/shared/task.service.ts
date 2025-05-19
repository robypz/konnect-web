import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Task } from './task.model';
import { config } from '../../../../config';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private _tasks = signal<Task[]>([]);
  private _task = signal<Task | null>(null);
  private _error = signal<HttpErrorResponse|null>(null);
  private apiUrl = config.API_URL+'/tasks';

  get tasks() {
    return this._tasks;
  }

  get task() {
    return this._task;
  }

  get error() {
    return this._error;
  }

  constructor() { }

  index() {
    this.http.get<Task[]>('http://localhost:3000/tasks').subscribe({
      next: (tasks) => {
        this._tasks.set(tasks);
        this._error.set(null);
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }

  show(id: string) {
    this.http.get<Task>(`http://localhost:3000/tasks/${id}`).subscribe({
      next: (task) => {
        this._task.set(task);
        this._error.set(null);
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }

  store(task: Task) {
    this.http.post<Task>('http://localhost:3000/tasks', task).subscribe({
      next: (task) => {
        this._tasks.update((tasks) => [...tasks, task]);
        this._error.set(null);
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }

  update(task: Task) {
    this.http.put<Task>(`http://localhost:3000/tasks/${task.id}`, task).subscribe({
      next: (task) => {
        this._tasks.update((tasks) => {
          this._error.set(null);
          const index = tasks.findIndex(t => t.id === task.id);
          tasks[index] = task;
          return [...tasks];
        });
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }

  destroy(id: string) {
    this.http.delete<Task>(`http://localhost:3000/tasks/${id}`).subscribe({
      next: () => {
        this._tasks.update((tasks) => {
          this._error.set(null);
          const index = tasks.findIndex(t => t.id === id);
          tasks.splice(index, 1);
          return [...tasks];
        });
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }

  byEmployee(employeeId: string) {
    this.http.get<Task[]>(`${this.apiUrl}/byEmployee/${employeeId}`).subscribe({
      next: (tasks) => {
        this._tasks.set(tasks);
        this._error.set(null);
      },
      error: (error) => {
        this._error.set(error);
      }
    });
  }
}
