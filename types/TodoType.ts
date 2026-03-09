import {Priority} from '@/types/Priority';

export default interface TodoType {
    id: string;
    title: string;
    description?: string;
    priority?: Priority;
    dueDate?: Date;
    isCompleted?: boolean;
}