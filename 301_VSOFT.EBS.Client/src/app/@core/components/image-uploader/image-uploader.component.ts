import {Component, EventEmitter, Input, OnDestroy, Output, QueryList, ViewChildren} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ImageUploaderService} from '@core/components/image-uploader/services/image-uploader.service';
import {Subscription} from 'rxjs';
import {ImageUploaderItemComponent} from '@core/components/image-uploader/image-uploader-item/image-uploader-item.component';

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

  @ViewChildren(ImageUploaderItemComponent) items: QueryList<ImageUploaderItemComponent>;

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

  uploadFile(event): void {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      const elName = element.name;
      const elSize = element.size;
      const elType = element.type;

      if (this.maxSize > elSize) {
        const reader = new FileReader();
        reader.readAsDataURL(element);
        reader.onload = (event) => { // called once readAsDataURL is completed
          const elUrl = event.target.result;
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

  getAcceptedTypes(): any {
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

  async uploadAll(uploadUrl: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.items.forEach(async (itm: ImageUploaderItemComponent, index, array) => {
        await itm.uploadFile(uploadUrl);
        if (index === array.length - 1) {
          resolve();
        }
      });
    });
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
