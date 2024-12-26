import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  // Third way of providing a service is with Element Injector:
  // providers: [TasksService]  // TasksService is only available in tasks component and its child components (new task and tasks list component) and not in the app component
})
export class TasksComponent {}
