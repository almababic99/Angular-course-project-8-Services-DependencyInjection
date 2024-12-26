import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';
import { InjectionToken } from '@angular/core';

export const TasksServiceToken = new InjectionToken<TasksService>('tasks-service-token');
// we are using this token in tasks-list.component.ts, task-item.component.ts and new-task.component.ts
// An Injection Token is a special type of token used to define a provider for a service or value that Angular can inject into components, services, or other places within the application.
// tokens are used to uniquely identify an injectable dependency.
// When using a token, you can reference services or values that would otherwise be difficult to inject directly 
// In this case, TasksServiceToken is a custom token used to provide TasksService in a flexible manner.

// The InjectionToken is a generic class that is provided with a type (TasksService in this case). This ensures that the token is typed correctly and only values of type TasksService can be injected using this token.
// 'tasks-service-token': The string passed as the second argument is an optional identifier for the token. This is mainly used for debugging purposes (to help you identify this token in logs or errors).
// This token (TasksServiceToken) now represents a placeholder for the TasksService that Angular can use for dependency injection.
// provide: TasksServiceToken: This tells Angular that whenever it encounters TasksServiceToken as a dependency, it should provide a corresponding value (which is defined in the useClass).
// useClass: TasksService: This means that whenever TasksServiceToken is injected, Angular should instantiate the TasksService class and inject it.


// bootstrapApplication(AppComponent).catch((err) => console.error(err));

// Second way of providing a service:
// bootstrapApplication(AppComponent, {
//     providers: [TasksService]
// }).catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
    providers: [{provide: TasksServiceToken, useClass: TasksService}]
}).catch((err) => console.error(err));
