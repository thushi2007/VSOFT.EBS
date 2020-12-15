import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploaderService implements OnDestroy {
  files: any[] = [];

  private removeItemSubscriber = new Subject<any>();
  removeItem = this.removeItemSubscriber.asObservable();

  private uploadImageSubscriber = new Subject<any>();
  uploadImage = this.uploadImageSubscriber.asObservable();

  constructor() {
  }

  getimagesDataList(): any {
    const lst = [];

    for (let index = 0; index < this.files.length; index++) {
      const album = {
        src: this.files[index].url,
        caption: this.files[index].name,
        thumb: this.files[index].url
      };

      lst.push(album);
    }

    return lst;
  }

  removeImage(index: number): void {
    this.removeItemSubscriber.next(index);
  }

  uploadAll(uploadUrl: string): void {
    this.uploadImageSubscriber.next(uploadUrl);
  }

  ngOnDestroy(): void {
    if (this.removeItemSubscriber) {
      this.removeItemSubscriber.unsubscribe();
    }

    if (this.uploadImageSubscriber) {
      this.uploadImageSubscriber.unsubscribe();
    }
  }
}
