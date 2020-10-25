import { Injectable } from '@angular/core';
import { IPDTO } from 'src/app/business/ip-dto';
import { LoggingService } from '../logging/logging.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  static readonly TAG = 'StorageService';

  constructor(private logger: LoggingService) {
    logger.logInfoMessage(StorageService.TAG, 'constructor started');
  }

  private storageArray: IPDTO[];

  addElementToArrayStorage(key: string, newElement: string) {
    this.logger.logInfoMessage(
      StorageService.TAG,
      'addElementToArrayStorage started'
    );

    if (this.storageArray != undefined) {
      let lastElement: IPDTO = this.storageArray[this.storageArray.length - 1];

      if (lastElement.ip !== newElement) {
        this.logger.logInfoMessage(
          StorageService.TAG,
          'addElementToArrayStorage element is different to latest ' +
            lastElement.ip +
            ' so pushing ' +
            newElement
        );
        let newArray = this.storageArray;
        newArray.forEach((element) => {
          this.logger.logInfoMessage(
            StorageService.TAG,
            'addElementToArrayStorage new array object ' + element.ip
          );
        });
        let newArrayItem = new IPDTO(newElement);
        newArray.push(newArrayItem);
        this.saveStringArrayToStorage(key, newArray);
      }
    } else {
      this.logger.logInfoMessage(
        StorageService.TAG,
        'addElementToArrayStorage existing array is empty so pushing ' +
          newElement
      );
      let newArray: IPDTO[] = [new IPDTO(newElement)];
      this.saveStringArrayToStorage(key, newArray);
    }
    this.logger.logInfoMessage(
      StorageService.TAG,
      'addElementToArrayStorage completed'
    );
  }

  saveStringArrayToStorage(key: string, arrayToStore: IPDTO[]) {
    this.logger.logInfoMessage(
      StorageService.TAG,
      'saveStringArrayToStorage started with array'
    );
    //TODO: add array to actual storage
    this.storageArray = arrayToStore;
    this.logger.logInfoMessage(
      StorageService.TAG,
      'saveStringArrayToStorage completed'
    );
    return true;
  }

  fetchStringArrayFromStorage(key: string) {
    this.logger.logInfoMessage(
      StorageService.TAG,
      'fetchStringArrayFromStorage started'
    );
    if (this.storageArray == undefined) {
      //TODO: get array from storage
      //set this.storageArray = returned array
    }
    this.logger.logInfoMessage(
      StorageService.TAG,
      'fetchStringArrayFromStorage completed with array'
    );
    return this.storageArray;
  }
}
