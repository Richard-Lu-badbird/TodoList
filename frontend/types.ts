export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    startTime: Date;
    endTime?:Date
}


//别名
export type Filter = 'all' | 'active' | 'completed';
