import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private tasksService = inject(TasksService); // injecting TasksService
  // The TasksService is injected into the component using the inject() function. This allows the component to access the service methods for retrieving the list of tasks.

  private selectedFilter = signal<string>('all');
  // This defines a reactive signal for tracking the selected filter type. Initially, it is set to 'all', meaning all tasks will be shown by default.
  // The selectedFilter will hold the current filter value (such as 'all', 'open', 'in-progress', or 'done').

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
