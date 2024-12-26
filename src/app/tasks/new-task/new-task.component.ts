import { Component, ElementRef, Inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';

@Component({
  selector: 'app-new-task',  // This defines the HTML tag <app-new-task></app-new-task> that will represent this component in the application.
  standalone: true,  // This indicates that the component is standalone, meaning it doesn't require being part of an Angular module to function. 
  imports: [FormsModule],  // The FormsModule is imported so that this component can use Angular forms and take advantage of features like ngModel for two-way data binding
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form'); 
  // This uses the viewChild decorator to get a reference to the <form> element in the component’s template. The ElementRef provides a way to interact with the actual DOM element (in this case, the form).

  // private tasksService: TasksService;  // This is a private field where the TasksService instance is stored. 

  // constructor(tService: TasksService) {
  //   this.tasksService = tService;
  // }
  // Angular's dependency injection system injects the TasksService into this component when it's created. The service is then assigned to the tasksService field, making it available for use throughout the component.
  
  constructor(@Inject(TasksServiceToken) private tasksService: TasksService) {}  // using custom token

  onAddTask(title: string, description: string) {  // This is the method that will be called when a new task is added
    this.tasksService.addTask({ title, description });  // addTask is in tasks.service.ts
    // This passes the task data (title and description) from the form to the addTask method in the service. The service will take care of adding the task to the task list.
    this.formEl()?.nativeElement.reset();
    // This uses the reference to the form element (retrieved via viewChild) to reset the form after submitting. The nativeElement gives direct access to the underlying DOM element, and the reset() method clears any form fields.
  }
}
