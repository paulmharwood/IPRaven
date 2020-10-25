import { Clipboard } from '@angular/cdk/clipboard';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
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
  current_ip: string;
  current_ip_fetched: string;
  ip_history: IPDTO[];
  sub: Subscription;

  constructor(
    private ipService: IpService,
    private loggerService: LoggingService,
    private clipboard: Clipboard,
    private storageService: StorageService
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

    this.lookupIPHistory(IpHistoryComponent.KEY);

    // this.lookupCurrentIP();
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
    //TODO: these two will be removed, mocking data only.
    let item1 = new IPDTO('1.0.0.1');
    let item2 = new IPDTO('1.0.0.2');
    let item3 = new IPDTO('1.0.0.3');
    let arrayToSave: IPDTO[] = [item1, item2, item3];
    this.storageService.saveStringArrayToStorage(key, arrayToSave);
    //END

    this.ip_history = this.storageService.fetchStringArrayFromStorage(key);

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
      this.current_ip = await this.ipService.getCurrentIP();
      this.current_ip_fetched = formatDate(
        new Date(),
        'yyyy/MM/dd HH:mm:ss',
        'en'
      );

      this.storageService.addElementToArrayStorage(
        IpHistoryComponent.KEY,
        this.current_ip
      );

      this.ip_history = this.storageService.fetchStringArrayFromStorage(
        IpHistoryComponent.KEY
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
