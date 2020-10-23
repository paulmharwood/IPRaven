/**
 * Interface for supplying database credentials.
 */
export interface IIP {
  getCurrentIP(): Promise<string>;
  getPreviousIPs(): string[];
}
