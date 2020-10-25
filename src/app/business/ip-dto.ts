import { formatDate } from '@angular/common';

export class IPDTO {
  constructor(
    public ip: string,
    public fetched: string = formatDate(new Date(), 'yyyy/MM/dd HH:mm', 'en')
  ) {}
}
