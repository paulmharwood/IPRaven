import { TestBed } from '@angular/core/testing';
import { IpService } from './ip.service';

describe('IpService', () => {
  let service: IpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('ip should be equal to', async () => {
    let currentIP = await service.getCurrentIP();
    expect(currentIP).not.toEqual('');
    expect(currentIP).not.toBeUndefined();
    expect(currentIP).not.toBeNull();
  });

  it('ip array should have entry equal to', () => {
    expect(service.getPreviousIPs()[0]).toEqual('0.0.0.1');
  });
});
