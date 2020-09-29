import {Component, EventEmitter, HostBinding, Input, OnDestroy, Output} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {ImageUploaderService} from '@core/components/image-uploader/services/image-uploader.service';
import {animate, group, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ebs-image-uploader-item',
  templateUrl: './image-uploader-item.component.html',
  styleUrls: ['./image-uploader-item.component.scss'],
  animations: [
    trigger('showhideMe', [
      transition('* => *', group([
        query(':enter', [
          style({
            transform: 'translateY(-100%)',
          }),
          animate('200ms',
            style({
              transform: 'translateY(0)',
            }))
        ], {optional: true}),
        query(':leave', [
          style({
            transform: 'translateY(0)',
          }),
          animate('200ms',
            style({
              transform: 'translateY(-100%)',
            }))
        ], {optional: true})
      ]))
    ])
  ]
})
export class ImageUploaderItemComponent implements OnDestroy {
  @HostBinding('@showhideMe') showhideme;

  @Input() uploadEntpoint: string;
  @Output() updateParent: EventEmitter<any> = new EventEmitter<any>();

  @Input() file: File;
  @Input() indx: number;

  files: File[] = [];

  progress: number;
  httpEvent: HttpEvent<{}>;
  httpEmitter: Subscription;

  subUploadImg: Subscription;
  subCancelUpload: Subscription;

  constructor(public httpClient: HttpClient,
              private uploaderService: ImageUploaderService) {
    this.subUploadImg = this.uploaderService.uploadImage.subscribe((index: number) => {
      this.uploadFile();
    });

    this.subCancelUpload = this.uploaderService.cancelUpload.subscribe(() => {
      this.cancel();
      this.updateParent.emit();
    });
  }

  removeImage(index: number): void {
    this.uploaderService.removeImage(index);
  }

  cancel(): void {
    this.progress = 0;
    if (this.httpEmitter) {
      this.httpEmitter.unsubscribe();
    }
  }

  uploadFile(): void {
    this.uploaderService.uploadIsRunning(true);
    const inputBody = new FormData();
    inputBody.append('File', this.file);
    inputBody.append('Name', this.file.name);
    inputBody.append('Size', this.file.size + '');
    inputBody.append('Type', this.file.type);

    const req = new HttpRequest<FormData>(
      'POST',
      this.uploadEntpoint,
      inputBody, {
        reportProgress: true
      });

    this.httpEmitter = this.httpClient.request(req)
      .subscribe(event => {
          this.httpEvent = event;
          if (event instanceof HttpResponse) {
            delete this.httpEmitter;

            setTimeout(() => {
              this.removeImage(this.indx);
            }, 1000);

            this.updateParent.emit();
          }
        },
        error => {
          alert('Error Uploading Files: ' + error.message);
        }, () => {
          this.uploaderService.uploadIsRunning(false);
        });
  }

  ngOnDestroy(): void {
    if (this.subUploadImg) {
      this.subUploadImg.unsubscribe();
    }

    if (this.subCancelUpload) {
      this.subCancelUpload.unsubscribe();
    }

    if (this.httpEmitter) {
      this.httpEmitter.unsubscribe();
    }
  }
}
