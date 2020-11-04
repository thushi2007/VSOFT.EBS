import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ImageUploaderService} from '@core/components/image-uploader/services/image-uploader.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ebs-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  providers: [ImageUploaderService]
})
export class ImageUploaderComponent implements OnDestroy {
  @Input() acceptedTypes: any[];
  @Input() maxSize: number;
  @Output() infoUpload: EventEmitter<any> = new EventEmitter<any>();

  set files(value) {
    this.uploaderService.files = value;
  }

  get files(): any[] {
    return this.uploaderService.files;
  }

  removeItemSub: Subscription;

  constructor(private uploaderService: ImageUploaderService,
              public httpClient: HttpClient) {
    this.removeItemSub = this.uploaderService.removeItem.subscribe((index: number) => {
      this.removeImage(index);
    });
  }

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      let element = event[index];
      let elName = element.name;
      let elSize = element.size;
      let elType = element.type;

      if (this.maxSize > elSize) {
        const reader = new FileReader();
        reader.readAsDataURL(element);
        reader.onload = (event) => { // called once readAsDataURL is completed
          let elUrl = event.target.result;
          this.files.push({
            file: element,
            name: elName,
            url: elUrl,
            size: elSize,
            type: elType
          });

          this.infoUpload.emit(this.files);
        };
      }
    }
  }

  getAcceptedTypes() {
    let acceptedTypes = '';

    this.acceptedTypes.forEach(el => {
      if (acceptedTypes) {
        acceptedTypes += ',' + el;
      } else {
        acceptedTypes += el;
      }
    });

    return acceptedTypes;
  }

  removeImage(index: number): void {
    this.files.splice(index, 1);
  }

  getDate(): any {
    return new Date();
  }

  uploadAll(uploadUrl: string): void {
    this.uploaderService.uploadAll(uploadUrl);
  }

  clearAllImages(): void {
    this.files = [];
    this.infoUpload.emit(this.files);
  }

  ngOnDestroy(): void {
    if (this.removeItemSub) {
      this.removeItemSub.unsubscribe();
    }
  }
}
