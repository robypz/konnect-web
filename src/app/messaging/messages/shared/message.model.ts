import { Employee } from "../../../work/employees/shared/employee.model";

export interface Message {
  id : string;
  content : string;
  employee_id: string;
  employee : Employee
}
