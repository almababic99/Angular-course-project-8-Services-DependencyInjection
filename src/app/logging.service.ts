import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {  // we are using this service in tasks.service.ts
  log(message: string) {  //  The method takes a message of type string as an argument. This method is responsible for logging the message to the console, prefixed with a timestamp.
    const timeStamp = new Date().toLocaleTimeString();  // This creates a timestamp of the current time by using toLocaleTimeString(), which formats the time in the user's locale. This timestamp will be part of the log entry.
    console.log(`[${timeStamp}]: ${message}`);  //The message is logged to the browser’s console.
  }
}
