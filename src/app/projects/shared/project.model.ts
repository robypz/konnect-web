import { Status } from "../../core/models/status.model";
import { Employee } from "../../employees/shared/employee.model";
import { Task } from "../../tasks/shared/task.model";

export interface Project {
  id: string;
  name: string;
  description: string;
  start_date: Date;
  progress: number;
  deadline: Date;
  status_id: string;
  employees: Employee[];
  tasks: Task[];
  status : Status;
  create_at: string;
  update_at: string;
}
