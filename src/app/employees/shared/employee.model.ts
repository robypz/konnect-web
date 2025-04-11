import { User } from "../../core/models/user.model";
import { Project } from "../../projects/shared/project.model";
import { Task } from "../../tasks/shared/task.model";

export interface Employee {
  id: string; // Unique identifier for the employee
  created_at: Date; // Timestamp when the employee was created
  updated_at: Date; // Timestamp when the employee was last updated
  tasks?: Task[]; // Optional array of tasks associated with the employee
  projects?: Project[]; // Optional array of projects associated with the employee
  user_id: string; // ID of the user associated with the employee
  user : User;
}
