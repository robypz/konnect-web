import { Employee } from "../../employees/shared/employee.model";

export interface User {
  id: string; // Unique identifier for the user
  name: string; // Name of the user
  last_name: string; // Last name of the user
  email: string; // Email address of the user
  created_at: Date;
  updated_at: Date;
  employee: Employee;
}
