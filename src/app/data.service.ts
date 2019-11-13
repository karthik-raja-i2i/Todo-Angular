import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Task} from 'src/app/Task';
import {SubTask} from 'src/app/SubTask';
import {Step} from 'src/app/Step';

@Injectable({
  providedIn: 'root'
})

/**
 * <p>
 * The Dataservice class acts as the data provider for the entire
 * application. It gets the current task or sub task as selected by the
 * user and makes it as an Observable object. Thus all other objects
 * accessing the current task or sub task become the subscribers
 * </p>
 * 
 * @author karthik created on 4 October 2019
 */
export class DataService {

  task: Task;
  private activeTask = new BehaviorSubject(this.task);
  currentTask = this.activeTask.asObservable();

  subTask: SubTask;
  private activeSubTask = new BehaviorSubject(this.subTask);
  currentSubTask = this.activeSubTask.asObservable();

  constructor() { }

  updateTask(newTask: Task) {
    this.activeTask.next(newTask);
  }

  updateSubTask(newSubTask: SubTask) {
    this.activeSubTask.next(newSubTask);
  }

  setUpdate(data){ 
    this.currentTask = data;   
  }
  
  getUpdate(){
    return this.currentTask;
  }
}

