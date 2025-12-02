export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}


//别名
export type Filter = 'all' | 'active' | 'completed';
