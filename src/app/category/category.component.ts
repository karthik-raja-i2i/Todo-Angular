import { Component, OnInit, Input } from '@angular/core';
import { AllTasks } from '../tasks';
import {Task} from 'src/app/Task';
import {CategoryService} from "src/app/category-service.service";
import {TasksComponent} from "src/app/tasks/tasks.component";
import {Utils} from 'src/app/utils/utils';
import { DataService } from "../data.service";
import { NgModule } from '@angular/core';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

/**
 * <p>
 * The CategoryComponent acts as controller for left side panel, where
 * new tasks are added first. After adding tasks sub tasks are added by clicking
 * a particular task
 * </p>
 * 
 * @author karthik created on 3 October 2019
 */
export class CategoryComponent implements OnInit {

  tasks: AllTasks = {allTasks: []};
  currentTask:Task;
  stats:number;
  categoryStats:number;
  categoryService = new CategoryService;
  tasksComponent = new TasksComponent(this.data);
  commonUtils = new Utils;
  
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentTask.subscribe(currentTask => this.currentTask = currentTask)
  }

  /**
   * It adds a new category or a task to the to do list
   * @param e - The element containig the entered name of task
   */
  public addCategory(e) {
    if(e.keyCode == 13 && e.target.value != "") {
      this.currentTask = this.categoryService.getCreatedTask(e.target.value)
      this.tasks.allTasks.push(this.currentTask);
      this.data.updateTask(this.currentTask);
      e.target.value ="";
      this.stats = this.tasks.allTasks.filter((task:Task) => task.isDeleted === false).length;
      this.categoryStats = this.currentTask.subtasks.length;
    }

  }

  /**
   * It toggles the main menu inside out when clicked
   * @param e - The indicator element with current status of the menu
   */
  public toggle(e) {
    let tasks = document.querySelector(".tasks");
    if(e.target.value === "open") {
        e.target.value = "close";
        this.commonUtils.mapAttributes(document.querySelector(".menu"),[["class","menu menuClosed"]]);
        this.commonUtils.mapAttributes(document.querySelector(".tasks"),[["class","tasks tasksClosed"]]);
    }
    else {
        e.target.value = "open";
        this.commonUtils.mapAttributes(document.querySelector(".menu"),[["class","menu"]]);
        this.commonUtils.mapAttributes(document.querySelector(".tasks"),[["class","tasks"]]);
    }   

  }

  /**
   * It adds sub tasks to the selected task, clicked by the user
   * @param task - The task clicked by the user
   */
  public addSubTask(task: Task) {
    this.data.updateTask(task);
    this.tasksComponent.addSubTask(task);
    this.stats = this.tasks.allTasks.filter((task:Task) => task.isDeleted === false).length;
    this.categoryStats = this.currentTask.subtasks.length;
  }
}
