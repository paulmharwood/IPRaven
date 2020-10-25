import { TestBed } from '@angular/core/testing';
import { IPDTO } from 'src/app/business/ip-dto';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return increasing list of ips', () => {
    let item1 = new IPDTO('1.0.0.1');
    let item2 = new IPDTO('1.0.0.2');
    let item3 = new IPDTO('1.0.0.3');
    let arrayToSave: IPDTO[] = [item1, item2, item3];
    expect(service.saveStringArrayToStorage('IPRaven', arrayToSave)).toEqual(
      true
    );

    expect(service.fetchStringArrayFromStorage('meh').length).toEqual(3);
    service.addElementToArrayStorage('IPRaven', 'Abc');
    expect(service.fetchStringArrayFromStorage('meh').length).toEqual(4);
    service.addElementToArrayStorage('IPRaven', 'Abc');
    expect(service.fetchStringArrayFromStorage('meh').length).toEqual(4);
  });
});
