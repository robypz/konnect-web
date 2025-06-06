import { Category } from "../../categories/shared/category.model";
import { Status } from "../../core/models/status.model";
import { Employee } from "../../employees/shared/employee.model";
import { Task } from "../../tasks/shared/task.model";

export interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  deadline: Date;
  start_date: Date;
  created_at: Date;
  updated_at: Date;

  category_id: string;
  category: Category;

  status_id: string;
  status : Status;

  employees: Employee[];
  tasks: Task[];

}
