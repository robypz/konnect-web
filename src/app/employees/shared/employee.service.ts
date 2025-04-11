import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);
  private employees = signal<Employee[]>([]);
  private employee = signal<Employee | null>(null);
  private errors = signal<string[]>([]);

  constructor() { }

  index(){
    this.http.get<Employee[]>('http://localhost:3000/employees').subscribe({
      next: (employees) => {
        this.employees.set(employees);
      },
      error: (error) => {
        this.errors.set([error]);
      }
    });
  }

  show(id: number){
    this.http.get<Employee>(`http://localhost:3000/employees/${id}`).subscribe({
      next: (employee) => {
        this.employee.set(employee);
      },
      error: (error) => {
        this.errors.set([error]);
      }
    });
  }

  store(employee: Employee){
    this.http.post<Employee>('http://localhost:3000/employees', employee).subscribe({
      next: (employee) => {
        this.employees.update((employees) => [...employees, employee]);
      },
      error: (error) => {
        this.errors.set([error]);
      }
    });
  }

  update(employee: Employee){
    this.http.put<Employee>(`http://localhost:3000/employees/${employee.id}`, employee).subscribe({
      next: (employee) => {
        this.employees.update((employees) => {
          const index = employees.findIndex(e => e.id === employee.id);
          employees[index] = employee;
          return [...employees];
        });
      },
      error: (error) => {
        this.errors.set([error]);
      }
    });
  }

  destroy(id: string){
    this.http.delete<Employee>(`http://localhost:3000/employees/${id}`).subscribe({
      next: () => {
        this.employees.update((employees) => {
          const index = employees.findIndex(e => e.id === id);
          employees.splice(index, 1);
          return [...employees];
        });
      },
      error: (error) => {
        this.errors.set([error]);
      }
    });
  }
}
