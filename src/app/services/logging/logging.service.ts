import { Injectable } from '@angular/core';
import { ILogger } from 'src/app/business/i-logger';

@Injectable({
  providedIn: 'root',
})
export class LoggingService implements ILogger {
  static readonly TAG = 'LoggingService';

  constructor() {
    this.logInfoMessage(LoggingService.TAG, 'constructor started');
  }
  logInfoMessage(tag: string, message: string): void {
    console.info(tag, message);
  }
  logErrorMessage(tag: string, message: string): void {
    console.info(tag, message);
  }
}
