import { Employee } from "../../../work/employees/shared/employee.model";

export interface Chat {
  id : string,
  employee_ids : string[],
  Employees : Employee[],
  type : string,
}
