import { Component, OnInit } from '@angular/core';
import { IpService } from 'src/app/services/ip/ip.service';

@Component({
  selector: 'app-ip-history',
  templateUrl: './ip-history.component.html',
  styleUrls: ['./ip-history.component.css'],
})
export class IpHistoryComponent implements OnInit {
  constructor(private ipService: IpService) {}

  ngOnInit(): void {
    this.ipService.initialise();
  }

  get currentIP() {
    return this.ipService.getCurrentIP();
  }

  get ipHistory() {
    return this.ipHistory();
  }
}
