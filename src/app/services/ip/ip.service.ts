import { Injectable } from '@angular/core';
import * as publicIP from 'public-ip';
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

  async getCurrentIP() {
    this.logger.logInfoMessage(IpService.TAG, 'getCurrentIP');
    let currentIP = await publicIP.v4();
    return currentIP;
  }
  getPreviousIPs(): string[] {
    this.logger.logInfoMessage(IpService.TAG, 'getPreviousIPs');
    return ['0.0.0.1', '0.0.0.2'];
  }
}
