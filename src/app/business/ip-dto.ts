import { formatDate } from '@angular/common';
import { Constants } from './constants';

export class IPDTO {
  constructor(
    public ip: string,
    public fetched: string = formatDate(
      new Date(),
      Constants.dateFormat,
      Constants.locale
    )
  ) {}
}
