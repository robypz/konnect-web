import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { Employee } from './employee.model';
import { config } from '../../../../config';
import { Pagination } from '../../core/models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);
  private _employees = signal<Employee[]>([]);
  private _employee = signal<Employee | null>(null);
  private _errors = signal<string[]>([]);
  private _pagination = signal<Pagination | null>(null);
  private apiUrl = config.API_URL + '/employees';

  get employees(): Signal<Employee[]> {
    return this._employees;
  }

  get employee(): Signal<Employee | null> {
    return this._employee;
  }

  get errors() {
    return this._errors;
  }

  get pagination() {
    return this._pagination;
  }

  constructor() { }

  index() {
    this.http.get<any>(`${this.apiUrl}`).subscribe({
      next: (res) => {
        this._employees.set(res.data);
        this._pagination.set(res);
      },
      error: (error) => {
        this._errors.set([error]);
      }
    });
  }

  show(id: String) {
    this.http.get<Employee>(`${this.apiUrl}/${id}`).subscribe({
      next: (employee) => {
        this._employee.set(employee);
      },
      error: (error) => {
        this._errors.set([error]);
      }
    });
  }

  store(employee: FormData) {
    this.http.post<Employee>(`${this.apiUrl}`, employee).subscribe({
      next: (employee) => {
        this._employee.set(employee);
        this._employees.update((employees) => [...employees, employee]);
      },
      error: (error) => {
        this._errors.set([error]);
      }
    });
  }

  update(employee: Employee) {
    this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee).subscribe({
      next: (employee) => {
        this._employees.update((employees) => {
          const index = employees.findIndex(e => e.id === employee.id);
          employees[index] = employee;
          return [...employees];
        });
      },
      error: (error) => {
        this._errors.set([error]);
      }
    });
  }

  destroy(id: string) {
    this.http.delete<Employee>(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this._employees.update((employees) => {
          const index = employees.findIndex(e => e.id === id);
          employees.splice(index, 1);
          return [...employees];
        });
      },
      error: (error) => {
        this._errors.set([error]);
      }
    });
  }

  search(search: string) {
    this.http.get<any>(`${this.apiUrl}/search/${search}`).subscribe({
      next: (res) => {
        this._employees.set(res.data);
        this._pagination.set(res);
      },
      error: (error) => {
        this._errors.set([error]);
      }
    });
  }

  addEmployee(employee: Employee, employees: Employee[]) {
    if (!employees.find((e: Employee) => e.id === employee.id)) {
      employees.push(employee);
    }
    else {
      employees = [employee];
    }
    return employees;
  }

  removeEmployee(employee: Employee, employees: Employee[]) {
    const index = employees.findIndex((e: Employee) => e.id === employee.id);
    if (index !== -1) {
      employees.splice(index, 1);
    }
    return employees;
  }
}
