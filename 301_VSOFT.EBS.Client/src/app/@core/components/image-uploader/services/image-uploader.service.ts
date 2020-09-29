import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploaderService {
  private removeItemSubscriber = new Subject<any>();
  removeItem = this.removeItemSubscriber.asObservable();

  private uploadImageSubscriber = new Subject<any>();
  uploadImage = this.uploadImageSubscriber.asObservable();

  private cancelUploadSubscriber = new Subject<any>();
  cancelUpload = this.cancelUploadSubscriber.asObservable();

  private uploadRunnigSubscriber = new Subject<any>();
  uploadRunnig = this.uploadRunnigSubscriber.asObservable();

  constructor() {
  }

  removeImage(index: number): void {
    this.removeItemSubscriber.next(index);
  }

  uploadAll(): void {
    this.uploadImageSubscriber.next();
  }

  cancelUploadImages(): void {
    this.cancelUploadSubscriber.next();
  }

  uploadIsRunning(running: boolean): void {
    this.uploadRunnigSubscriber.next(running);
  }
}
