import { InjectionToken, Provider } from "@angular/core";

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

type TaskStatusOptions = {  
  value: 'open' | 'in-progress' | 'done';
  taskStatus: TaskStatus;
  text: string;
}[];

export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions>('task-status-options');
// An InjectionToken is created to allow Angular’s Dependency Injection system to recognize a value that can be injected into components or services.
// The InjectionToken will be used to inject TaskStatusOptions into parts of the application where needed.
// The 'task-status-options' string is just a name to identify the token, typically used for debugging purposes.

export const TaskStatusOptions: TaskStatusOptions = [
  {
    value: 'open',
    taskStatus: 'OPEN',
    text: 'Open'
  },
  {
    value: 'in-progress',
    taskStatus: 'IN_PROGRESS',
    text: 'In-Progress'
  },
  {
    value: 'done',
    taskStatus: 'DONE',
    text: 'Completed'
  }
];
// TaskStatusOptions is an array of objects, each object corresponding to one of the task statuses.
// value is the lowercase string (e.g., 'open').
// taskStatus is the actual status ('OPEN', 'IN_PROGRESS', 'DONE').
// text is a human-readable string that can be displayed in the UI.
// This array will be injected wherever the TASK_STATUS_OPTIONS token is requested.

export const taskStatusOptionsProvider: Provider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOptions
}
// This is the provider configuration for Angular's Dependency Injection system. It binds the TASK_STATUS_OPTIONS token to the TaskStatusOptions value.
// provide: TASK_STATUS_OPTIONS: This tells Angular that whenever the TASK_STATUS_OPTIONS token is injected, it should use the value provided by the useValue property.
// useValue: TaskStatusOptions: This specifies that TaskStatusOptions (the array of task status objects) is the value that will be injected.
// This allows TaskStatusOptions to be injected wherever TASK_STATUS_OPTIONS is needed.

// we are using this in tasks-list.component.ts and task-item.component.html

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
