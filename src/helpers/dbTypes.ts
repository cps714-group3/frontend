export type Issue = {
    title: string;
    description: string;
    assignee: string;
    reporter: string;
    priority: string;
    status: 'TO DO' | 'IN PROGRESS' | 'DONE';
    due: string;
};
