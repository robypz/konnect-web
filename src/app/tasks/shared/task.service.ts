import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private _tasks = signal<Task[]>([]);
  private _task = signal<Task | null>(null);
  private _errors = signal<string[]>([]);

  get tasks() {
    return this._tasks();
  }

  get task() {
    return this._task();
  }

  get errors() {
    return this._errors();
  }

  constructor() { }

  index() {
    this.http.get<Task[]>('http://localhost:3000/tasks').subscribe({
      next: (tasks) => {
        this._tasks.set(tasks);
        this._errors.set([]);
      },
      error: (error) => {
        this._errors.set([error]);
      }
    });
  }

  show(id: string) {
    this.http.get<Task>(`http://localhost:3000/tasks/${id}`).subscribe({
      next: (task) => {
        this._task.set(task);
        this._errors.set([]);
      },
      error: (error) => {
        this._errors.set([error]);
      }
    });
  }

  store(task: Task) {
    this.http.post<Task>('http://localhost:3000/tasks', task).subscribe({
      next: (task) => {
        this._tasks.update((tasks) => [...tasks, task]);
        this._errors.set([]);
      },
      error: (error) => {
        this._errors.set([error]);
      }
    });
  }

  update(task: Task) {
    this.http.put<Task>(`http://localhost:3000/tasks/${task.id}`, task).subscribe({
      next: (task) => {
        this._tasks.update((tasks) => {
          this._errors.set([]);
          const index = tasks.findIndex(t => t.id === task.id);
          tasks[index] = task;
          return [...tasks];
        });
      },
      error: (error) => {
        this._errors.set([error]);
      }
    });
  }

  destroy(id: string) {
    this.http.delete<Task>(`http://localhost:3000/tasks/${id}`).subscribe({
      next: () => {
        this._tasks.update((tasks) => {
          this._errors.set([]);
          const index = tasks.findIndex(t => t.id === id);
          tasks.splice(index, 1);
          return [...tasks];
        });
      },
      error: (error) => {
        this._errors.set([error]);
      }
    });
  }
}
