import { Component, OnInit } from '@angular/core';
import {Task} from 'src/app/Task';
import { DataService } from "../data.service";
import { SubTask } from '../SubTask';
import {StepsComponent} from "src/app/steps/steps.component";
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

/**
 * <p>
 * The TaskComponent is the main controller for central panel ,where sub tasks
 * are added for a task. It shows list of sub tasks of current task, with the 
 * count of completed and total sub tasks. A click on a sub task will allow the user
 * to add steps to the particular subtask
 * </p>
 * 
 * @author karthik created on 7 october 2019
 */
export class TasksComponent implements OnInit {

  constructor(private data: DataService) { }

  currentTask : Task;
  currentSubTask : SubTask; 
  subTask : SubTask;
  stepsComponent = new StepsComponent(this.data);
  stats: string ;
  showDelete: boolean = false;

  ngOnInit() {
    this.data.currentTask.subscribe(activeTask => this.currentTask = activeTask);
    this.data.currentSubTask.subscribe(activeSubTask => this.currentSubTask = activeSubTask);
    this.data.getUpdate();
  }

  /**
   * It shows the task addition option when clicked on the category
   * @param task - The task selected by the user
   */
  public addSubTask(task:Task) {
    this.currentTask = task;
    this.stats = `${this.getCompletedSubTasks()} of ${this.currentTask.subtasks.length} completed`;
  }

  /**
   * It saves the sub task inside the selected main task
   * @param e - The element containig sub task name entered by user
   */
  public saveSubTask(e) {
    if(e.keyCode == 13 && e.target.value != "") {
      this.subTask = {id: Date.now(), info: e.target.value, isAvailable: true, isDeleted: false, steps: [],notes: ""};
      e.target.value = "";
      this.currentTask.subtasks.push(this.subTask);
      this.data.updateTask(this.currentTask);
      this.data.updateSubTask(this.currentSubTask);
      this.data.setUpdate(this.currentTask);
      this.stats = `${this.getCompletedSubTasks()} of ${this.currentTask.subtasks.length} completed`;
    }
  }

  /**
   * It changes the status of sub task on clicking. A completed task will have a strike mark
   * @param sub - The subtask whoose status has to be changed
   */
  public changeSubTaskStatus(sub:SubTask) {
    let subTask = this.currentTask.subtasks.find(({id}) => id == sub.id);
    if(subTask.isAvailable) 
      subTask.isAvailable = false;
    else
      subTask.isAvailable = true;
    this.stats = `${this.getCompletedSubTasks()} of ${this.currentTask.subtasks.length} completed`;
  }

  /**
   * It adds steps to a selected sub task
   * @param subTask - The sub task to which steps are to be added 
   */
  public showStepsMenu(subTask:SubTask) {
    this.stepsComponent.showStepsMenu(subTask);
  }

  /**
   * It gets the count of sub tasks that has been completed
   * @return - The total number of completed sub tasks 
   */
  public getCompletedSubTasks () {
    let count = this.currentTask.subtasks.filter((subtask:SubTask) => subtask.isAvailable === false).length;
    return count;
  }

  /**
   * It shows delete option for task deletion
   */
  public showDeleteOption() {
    if(!this.showDelete) {
      this.showDelete = true;
      return;
    }
    this.showDelete = false;
  }

  /**
   * It deletes the current category
   */
  public deleteCurrentCategory() {
    this.currentTask.isDeleted = true;
  }

}
