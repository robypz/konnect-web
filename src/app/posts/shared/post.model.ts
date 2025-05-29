export interface Post {
    id: string;
    content: string;
    media: string[];
    created_at: Date;
    updated_at: Date;
    employee_id: string;
    proyect_id?: string;
    employee: {
        id: string;
        name: string;
        email: string;
        avatar?: string;
    };
    proyect?: {
        id: string;
        name: string;
        description?: string;
        start_date?: Date;
        end_date?: Date;
    };
}
