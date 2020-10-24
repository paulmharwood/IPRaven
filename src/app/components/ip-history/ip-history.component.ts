import { Clipboard } from '@angular/cdk/clipboard';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
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
  sub: Subscription;

  constructor(
    private ipService: IpService,
    private loggerService: LoggingService,
    private clipboard: Clipboard
  ) {
    this.loggerService.logInfoMessage(
      IpHistoryComponent.TAG,
      'constructor started'
    );

    this.loggerService.logInfoMessage(
      IpHistoryComponent.TAG,
      'constructor completed'
    );
  }

  ngOnInit(): void {
    this.loggerService.logInfoMessage(
      IpHistoryComponent.TAG,
      'ngOnInit started'
    );

    this.lookupCurrentIP();
    const observable = interval(10000);
    this.sub = observable.subscribe((x) => this.lookupCurrentIP());

    // this.lookupCurrentIP();
    this.loggerService.logInfoMessage(
      IpHistoryComponent.TAG,
      'ngOnInit completed'
    );
  }

  async lookupCurrentIP() {
    this.loggerService.logInfoMessage(
      IpHistoryComponent.TAG,
      'lookupCurrentIP started'
    );
    try {
      this.current_ip = await this.ipService.getCurrentIP();
      this.current_ip_fetched = formatDate(
        new Date(),
        'yyyy/MM/dd HH:mm:ss',
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

  copyCurrentIpToClipboard() {
    this.loggerService.logInfoMessage(
      IpHistoryComponent.TAG,
      'copyCurrentIpToClipboard started'
    );
    this.clipboard.copy(this.current_ip);
    this.loggerService.logInfoMessage(
      IpHistoryComponent.TAG,
      'copyCurrentIpToClipboard completed with ip ' + this.current_ip
    );
  }
}
