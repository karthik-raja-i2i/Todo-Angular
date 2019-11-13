import { Component, OnInit } from '@angular/core';
import { SubTask } from '../SubTask';
import { Step } from '../Step';
import { DataService } from '../data.service';
import {Task} from 'src/app/Task';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})

/**
 * <p>
 * The StepsComponent is the main controller for adding steps to a sub task
 * Steps are added to the active sub task. Steps can be marked as completed
 * by striking or entirely be deleted. 
 * </p>
 * 
 * @author karthik created on 7 October 2019
 */
export class StepsComponent implements OnInit {

  currentTask : Task;
  currentSubTask : SubTask; 
  step: Step;
  stats: string;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentTask.subscribe(activeTask => this.currentTask = activeTask);
    this.data.currentSubTask.subscribe(activeSubTask => this.currentSubTask = activeSubTask);
    this.data.getUpdate();
  }

  /**
   * It shows the seleted sub task in steps menu for adding steps
   * @param subTask - The selected sub task
   */
  public showStepsMenu(subTask:SubTask) {
    this.currentSubTask = subTask;
    this.data.updateSubTask(this.currentSubTask);
  }

  /**
   * It saves a step inside the current sub task
   * @param e - The input element containing the step name 
   */
  public saveStep(e) {
    if(e.keyCode == 13 && e.target.value != "") {
      let stepName = e.target.value;
      this.step = {id: Date.now(), name: stepName, isAvailable: true, isDeleted: false};
      e.target.value = "";
      this.currentSubTask.steps.push(this.step);
      this.data.updateTask(this.currentTask);
      this.data.updateSubTask(this.currentSubTask);
      this.data.setUpdate(this.currentTask);
      this.stats = `${this.getCompletedSteps()} of ${this.currentSubTask.steps.length} completed`;
    }
  }

  /**
   * It saves the notes for the current sub task
   * @param e - The element containing text entered by the user
   */
  public saveNotes(e) {
      this.currentSubTask.notes = e.target.value;
  }

  /**
   * It changes the status of the step to true or false
   * @param step - The step whoose status has to be changes
   */
  public changeStepStatus(step:Step) {
    let activeStep = this.currentSubTask.steps.find(({id}) => id == step.id);
    if(activeStep.isAvailable) 
      activeStep.isAvailable = false;
    else
      activeStep.isAvailable = true;
    this.stats = `${this.getCompletedSteps()} of ${this.currentSubTask.steps.length} completed`;
  }

  /**
   * It deletes the step as selected
   * @param step - The step to be deleted 
   */
  public deleteStep(step:Step) {
    if(confirm("Do you really want to delete the step?")) {
      let index = this.currentSubTask.steps.indexOf(step);
      this.currentSubTask.steps.splice(index,1);
      this.stats = `${this.getCompletedSteps()} of ${this.currentSubTask.steps.length} completed`;
    }
  }

  /**
   * It toggles the steps menu on click
   */
  public toggleSteps() {
    this.currentSubTask = null;
  }

  /**
   * It gets the count of steps that has been completed
   * @return - The total number of completed steps 
   */
  public getCompletedSteps() {
    let count = this.currentSubTask.steps.filter((step:Step) => step.isAvailable === false).length;
    return count;
  }

  /**
   * It deletes the current sub task and shows the previous or the next sub task
   */
  public deleteCurrentSubTask() {
    if(confirm("Do you really want to delete the sub task?")) {
      let index = this.currentTask.subtasks.indexOf(this.currentSubTask);
      if (this.currentTask.subtasks.length == (index+1)) 
        this.currentSubTask = null;
      else if (index == 0 && this.currentTask.subtasks.length == index+1) 
        this.currentSubTask = this.currentTask.subtasks[index+1];
      else 
        this.currentSubTask = this.currentTask.subtasks[index-1];
      this.currentTask.subtasks.splice(index,1);
      this.stats = `${this.getCompletedSteps()} of ${this.currentSubTask.steps.length} completed`;
    }
  }
}