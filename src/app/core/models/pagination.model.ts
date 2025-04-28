export interface Pagination {
    path: string; // Path to the employee's resource
    per_page: number; // Number of items per page,
    next_cursor: string; // Cursor for the next page of results
    next_page_url: string; // URL for the next page of results,
    prev_cursor: string; // Cursor for the previous page of results,
    prev_page_url: string; // URL for the previous page of results
}
