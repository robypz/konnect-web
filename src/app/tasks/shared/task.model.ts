import { Employee } from "../../employees/shared/employee.model";
import { Project } from "../../projects/shared/project.model";

export interface Task {
  id: string; // Unique identifier for the task
  name: string; // Title of the task
  description: string; // Description of the task
  completed_at: boolean; // Indicates if the task is completed
  created_at: Date; // Timestamp when the task was created
  updated_at: Date; // Timestamp when the task was last updated
  employee_id: string; // ID of the employee assigned to the task
  employee : Employee; // Employee object associated with the task
  project_id: string; // ID of the project to which the task belongs
  project : Project; // Project object associated with the task
}
