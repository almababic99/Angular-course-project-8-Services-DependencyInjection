import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';
import { TASK_STATUS_OPTIONS, TaskStatusOptions, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider]  // provider is in task.model.ts
})
export class TasksListComponent {
  // private tasksService = inject(TasksService); // injecting TasksService
  // The TasksService is injected into the component using the inject() function. This allows the component to access the service methods for retrieving the list of tasks.
  private tasksService = inject(TasksServiceToken); // using custom token

  private selectedFilter = signal<string>('all');
  // This defines a reactive signal for tracking the selected filter type. Initially, it is set to 'all', meaning all tasks will be shown by default.
  // The selectedFilter will hold the current filter value (such as 'all', 'open', 'in-progress', or 'done').

  taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  // This uses the inject() function to inject the TASK_STATUS_OPTIONS token into the component. This token is linked to a set of predefined options for task statuses (like open, in-progress, and done), which were provided in the taskStatusOptionsProvider.
  // TASK_STATUS_OPTIONS is an InjectionToken that points to an array of task status options (defined in task.model.ts). It contains a structured array of objects where each object represents a task's status with a value, taskStatus, and text (e.g., 'open', 'in-progress', 'done').
  // Once taskStatusOptions is injected into the TasksListComponent, it will contain the array of predefined status options. The primary use of this injected value is to populate and display status options in the UI (e.g., in a dropdown or a list). This allows the user to filter and interact with the list of tasks based on their statuses.


  tasks = computed(() => {  // computed() function is used to create a derived state, which automatically updates whenever the signals it depends on change. In this case, tasks is derived based on the selectedFilter signal.
    switch (this.selectedFilter()) {
      // cases are from tasks-list.component.html
      // this.selectedFilter(): The current value of the selectedFilter signal is accessed using () to evaluate the filter type (e.g., 'all', 'open', 'in-progress', 'done').
      case 'all':
        return this.tasksService.allTasks();
      case 'open':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService
          .allTasks()
          .filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.allTasks();
    }
  });

  onChangeTasksFilter(filter: string) {  // This method is called to change the current filter based on user input
    this.selectedFilter.set(filter);
    // This updates the selectedFilter signal with the new filter value. Since tasks is a computed signal that depends on selectedFilter, the task list will automatically update when the filter changes.
  }
}
