import {SubTask} from "src/app/SubTask";

export class Task {
    id: number;
    name: string;
    isAvailable: boolean;
    isDeleted: boolean;
    subtasks: SubTask[];
}