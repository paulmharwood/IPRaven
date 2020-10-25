import { Clipboard } from '@angular/cdk/clipboard';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Constants } from 'src/app/business/constants';
import { IPDTO } from 'src/app/business/ip-dto';
import { IpService } from 'src/app/services/ip/ip.service';
import { LoggingService } from 'src/app/services/logging/logging.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'ip-history',
  templateUrl: './ip-history.component.html',
  styleUrls: ['./ip-history.component.css'],
})
export class IpHistoryComponent implements OnInit {
  private static TAG = 'IpHistoryComponent';
  private static KEY = 'iphistory';
  current_ip: string = '';
  current_ip_fetched: string = '';
  ip_history: IPDTO[];
  sub: Subscription;

  constructor(
    private ipService: IpService,
    private loggerService: LoggingService,
    private clipboard: Clipboard,
    private storageService: StorageService
  ) {
    this.loggerService.logInfoMessage(IpHistoryComponent.TAG, 'constructor');
  }

  ngOnInit(): void {
    this.loggerService.logInfoMessage(IpHistoryComponent.TAG, 'ngOnInit');

    this.lookupCurrentIP();
    const observable = interval(10000);
    this.sub = observable.subscribe((x) => this.lookupCurrentIP());

    this.lookupIPHistory(IpHistoryComponent.KEY);

    this.loggerService.logInfoMessage(
      IpHistoryComponent.TAG,
      'ngOnInit completed'
    );
  }

  lookupIPHistory(key: string) {
    this.loggerService.logInfoMessage(
      IpHistoryComponent.TAG,
      'lookupIPHistory started'
    );

    let ipHistory = this.storageService.fetchStringArrayFromStorage(key);
    if (ipHistory != undefined) this.ip_history = ipHistory.reverse();

    this.loggerService.logInfoMessage(
      IpHistoryComponent.TAG,
      'lookupIPHistory completed'
    );
  }

  async lookupCurrentIP() {
    this.loggerService.logInfoMessage(
      IpHistoryComponent.TAG,
      'lookupCurrentIP started'
    );
    try {
      // Fetch current IP and date
      this.current_ip = await this.ipService.getCurrentIP();
      this.current_ip_fetched = formatDate(
        new Date(),
        Constants.dateFormat,
        Constants.locale
      );

      // Attempt to add, which compares to last entry
      this.storageService.addElementToArrayStorage(
        IpHistoryComponent.KEY,
        this.current_ip
      );

      // Re-render history binding in HTML
      this.lookupIPHistory(IpHistoryComponent.KEY);
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
