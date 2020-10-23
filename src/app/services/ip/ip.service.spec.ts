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

  it('should initialise', () => {
    expect(service.initialise()).not.toThrowError;
  });

  it('ip should be equal to', () => {
    expect(service.getCurrentIP()).toEqual('99.99.99.99');
  });

  it('ip array should have entry equal to', () => {
    expect(service.getPreviousIPs()[0]).toEqual('0.0.0.1');
  });
});
