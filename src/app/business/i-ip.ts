/**
 * Interface for supplying database credentials.
 */
export interface IIP {
  initialise(): void;
  getCurrentIP(): string;
  getPreviousIPs(): string[];
}
