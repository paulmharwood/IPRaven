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
    this.logger.logInfoMessage(IpService.TAG, 'getCurrentIP started');
    let currentIP = await publicIP.v4();
    this.logger.logInfoMessage(
      IpService.TAG,
      'getCurrentIP completed with ' + currentIP
    );
    return currentIP;
  }
  getPreviousIPs(): string[] {
    this.logger.logInfoMessage(IpService.TAG, 'getPreviousIPs started');
    let ips = ['0.0.0.1', '0.0.0.2'];
    this.logger.logInfoMessage(IpService.TAG, 'getPreviousIPs completed');
    return ips;
  }
}
