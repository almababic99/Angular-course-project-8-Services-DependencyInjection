import { Component, computed, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Task, TaskStatus } from '../../task.model';
import { TasksService } from '../../tasks.service';
import { TasksServiceToken } from '../../../../main';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {
  // private tasksService = inject(TasksService);  // The TasksService is injected into this component 
  private tasksService = inject(TasksServiceToken);  // using custom token

  task = input.required<Task>();  // The task property is marked with the input decorator. This means that the component expects a task object to be passed in from its parent component.
  // the task input is required, and the component will not work without it. The task object is expected to be of type Task, which contains the properties like id, title, description, and status.
  
  taskStatus = computed(() => {  // The taskStatus is a derived property that is computed based on the task's status.
    switch (this.task().status) {  // The status of the task is used to determine the display text 
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
    // The computed function ensures that taskStatus will automatically update whenever the task's status changes, reflecting the new status in the view.
  });

  onChangeTaskStatus(taskId: string, status: string) {  // This method is responsible for handling the change in task status.
    // The taskId is the ID of the task whose status needs to be updated.
    // status is  the new status of the task. It can be one of 'open', 'in-progress', or 'done'.

    let newStatus: TaskStatus = 'OPEN';

    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        break;
    }
    // The newStatus is set based on the passed status. The switch statement maps the string status ('open', 'in-progress', 'done') to the corresponding TaskStatus value ('OPEN', 'IN_PROGRESS', 'DONE').

    this.tasksService.updateTaskStatus(taskId, newStatus);
    // Once the new status is determined, the method calls updateTaskStatus on the TasksService to update the task's status in the service.
  }
}
