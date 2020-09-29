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
  @Input() uploadEntpoint: string;
  @Output() updateParent: EventEmitter<any> = new EventEmitter<any>();

  uploadIsRunnig = false;

  files: File[] = [];

  lastFileAt: Date;

  dragFiles: any;
  validComboDrag: any;
  lastInvalids: any;
  fileDropDisabled: any;
  maxSize: any = 5000000;

  errorMessage = '';

  removeItemSub: Subscription;
  uploadRunning: Subscription;

  constructor(private uploaderService: ImageUploaderService,
              public httpClient: HttpClient) {
    this.removeItemSub = this.uploaderService.removeItem.subscribe((index: number) => {
      this.removeImage(index);
    });

    this.uploadRunning = this.uploaderService.uploadRunnig.subscribe((state: boolean) => {
      this.uploadIsRunnig = state;
    });
  }

  removeImage(index: number): void {
    this.files.splice(index, 1);
  }

  cancelUpload(): void {
    this.uploaderService.cancelUploadImages();
  }

  getDate(): any {
    return new Date();
  }

  uploadAll(): void {
    this.uploaderService.uploadAll();
    this.updateParent?.emit();
  }

  clearAllImages(): void {
    this.files = [];
  }

  updateParentOfChild(): void {
    this.updateParent?.emit();
  }

  invalidErrorMessage(event: any[]): void {
    event?.forEach((element) => {
      if (element.file.type.indexOf('image') === -1) {
        this.errorMessage = 'Format nicht unterstützt';
      } else if (element.file.size > this.maxSize) {
        this.errorMessage = 'Bild(er) zu gross.';
      }
    });

    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.removeItemSub) {
      this.removeItemSub.unsubscribe();
    }

    if (this.uploadRunning) {
      this.uploadRunning.unsubscribe();
    }
  }
}
