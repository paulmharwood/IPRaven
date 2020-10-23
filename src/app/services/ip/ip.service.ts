import { Injectable } from '@angular/core';
import { IIP } from '../../business/i-ip';
import { LoggingService } from '../logging/logging.service';

@Injectable({
  providedIn: 'root',
})
export class IpService implements IIP {
  static readonly TAG = 'IpService';

  constructor(private logger: LoggingService) {
    logger.logInfoMessage(IpService.TAG, 'constructor started');
  }

  initialise(): void {
    this.logger.logInfoMessage(IpService.TAG, 'initialise');
  }
  getCurrentIP(): string {
    this.logger.logInfoMessage(IpService.TAG, 'getCurrentIP');
    return '99.99.99.99';
  }
  getPreviousIPs(): string[] {
    this.logger.logInfoMessage(IpService.TAG, 'getPreviousIPs');
    return ['0.0.0.1', '0.0.0.2'];
  }
}
