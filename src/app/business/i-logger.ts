export interface ILogger {
  logInfoMessage(tag: string, message: string): void;
  logErrorMessage(tag: string, message: string): void;
}
