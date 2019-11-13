import {Step} from "src/app/Step";

export class SubTask {
    id: number;
    info: string;
    isAvailable: boolean;
    isDeleted: boolean;
    notes: string;
    steps: Step[];
}