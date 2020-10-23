import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IpService } from 'src/app/services/ip/ip.service';
import { LoggingService } from 'src/app/services/logging/logging.service';

@Component({
  selector: 'ip-history',
  templateUrl: './ip-history.component.html',
  styleUrls: ['./ip-history.component.css'],
})
export class IpHistoryComponent implements OnInit {
  private static TAG = 'IpHistoryComponent';
  current_ip: string;
  current_ip_fetched: string;

  constructor(
    private ipService: IpService,
    private loggerService: LoggingService
  ) {
    loggerService.logInfoMessage(IpHistoryComponent.TAG, 'constructor started');
    this.lookupCurrentIP();
    loggerService.logInfoMessage(
      IpHistoryComponent.TAG,
      'constructor completed'
    );
  }

  ngOnInit(): void {}

  async lookupCurrentIP() {
    this.loggerService.logInfoMessage(
      IpHistoryComponent.TAG,
      'lookupCurrentIP started'
    );
    try {
      this.current_ip = await this.ipService.getCurrentIP();
      this.current_ip_fetched = formatDate(
        new Date(),
        'yyyy/MM/dd HH:mm',
        'en'
      );
    } catch (err) {
      this.loggerService.logErrorMessage(IpHistoryComponent.TAG, err);
    }

    this.loggerService.logInfoMessage(
      IpHistoryComponent.TAG,
      'lookupCurrentIP completed'
    );
  }
}
