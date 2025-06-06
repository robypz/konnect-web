import { Employee } from "../../../work/employees/shared/employee.model";
import { Project } from "../../../work/projects/shared/project.model";
import { Comment } from "../../comments/shared/comment.model";
import { Reaction } from "../../reactions/shared/reaction.model";

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
    reactions: Reaction[]
}
