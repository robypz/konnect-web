import { Employee } from "../../employees/shared/employee.model";

export interface Comment {
  id : string;
  content : string;
  employee_id : string;
  employee : Employee;
}
