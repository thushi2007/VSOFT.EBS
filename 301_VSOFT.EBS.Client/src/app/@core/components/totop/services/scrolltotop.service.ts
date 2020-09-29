import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrolltotopService {
  private scrollTopSubscriber = new Subject<any>();
  scrollTop = this.scrollTopSubscriber.asObservable();

  constructor() {

  }

  toTop(): void {
    this.scrollTopSubscriber.next();
  }
}
