import { Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',  // Injectable: This decorator marks the class as a service that can be injected into other components or services. The providedIn: 'root' option makes the service available globally in the app.
})
export class TasksService {
   // The service is called TasksService and it is used to manage an array of Task objects. It allows for adding new tasks, updating task statuses, and exposing the task list in a read-only format. 
   // It is designed to be used by multiple components (new-task.component.ts, tasks-list.component.ts, and task-item.component.ts).
  // we use this service in new-task.component.ts, tasks-list.component.ts and task-item.component.ts
  private tasks = signal<Task[]>([]); // this signal will manage an array of Task from task.model.ts
  // The tasks signal holds the list of tasks. signal<Task[]> indicates that tasks will be an array of Task objects.

  allTasks = this.tasks.asReadonly(); // asReadonly() makes the tasks signal read-only and exposes it via allTasks so other components can only read the tasks but cannot modify them directly.

  addTask(taskData: { title: string; description: string }) {  // This method is used to add a new task to the list. It takes taskData as an argument, which contains the task's title and description.
    // we call this method in new-task.component.ts
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
      // A new task is created by spreading the taskData and adding an id (generated randomly) and a status of 'OPEN'.
    };
    this.tasks.update((oldTasks) => [...oldTasks, newTask]);  
    // The update function is called on the tasks signal to update the list of tasks by appending the new task to the existing ones. 
    // update allows for an immutable operation on the tasks array, meaning it creates a new array with the updated data rather than mutating the existing one.
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {  // This method is used to update the status of a specific task based on its id. It takes taskId (the unique identifier of the task) and newStatus (the new status to set) as arguments.
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    // It uses the update method to modify the task list. It maps through the oldTasks array and updates the task with the matching id, changing its status to the new status. If the id doesn't match, the task remains unchanged
  }
}

// Angular services provide a way for you to separate Angular app data and functions that can be used by multiple components in your app.
// To be used by multiple components, a service must be made injectable. Services that are injectable and used by a component become dependencies of that component. The component depends on those services and can't function without them.
// Services help keep components clean and focused on their primary job, such as displaying data, while moving logic like data retrieval, state management, and other operations into services.
