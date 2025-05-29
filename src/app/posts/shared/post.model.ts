import { Comment } from "../../comments/shared/comment.model";
import { Employee } from "../../employees/shared/employee.model";
import { Project } from "../../projects/shared/project.model";

export interface Post {
    id: string;
    content: string;
    media: string[];
    created_at: Date;
    updated_at: Date;
    employee_id: string;
    employee: Employee
    project_id?: string;
    project: Project;
    comments: Comment[]
}
