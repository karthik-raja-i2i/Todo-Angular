import { Injectable } from '@angular/core';
import {Task} from "src/app/Task";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  constructor() { }

  /**
   * It creates a task and returns it
   * @param task - The task name entered by the user
   * @return newTask - The task created
   */
  public getCreatedTask(task:string) {
     let newTask = new Task();
    newTask.id = Date.now();
    newTask.name = task;
    newTask.isAvailable = true;
    newTask.isDeleted = false; 
    newTask.subtasks = [];
    return newTask;
  }

}
