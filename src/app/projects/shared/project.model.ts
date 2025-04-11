import { Employee } from "../../employees/shared/employee.model";
import { Task } from "../../tasks/shared/task.model";

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  employees: Employee[];
  tasks: Task[];
}
