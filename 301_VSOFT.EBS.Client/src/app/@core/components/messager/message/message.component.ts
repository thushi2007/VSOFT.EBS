import {Component, HostBinding, OnInit, Output, EventEmitter} from '@angular/core';
import {animate, animateChild, group, query, sequence, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ebs-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [
    trigger('HeightDown', [
      transition(':enter', [
        sequence([
          group([
            query(':self', [style({
              height: '0'
            }), animate('200ms ease-in')], {optional: true}),
            query('.msg-container', [style({
              transform: 'translateY(-100%)'
            }), animate('400ms ease-in')], {optional: true}),
          ])
        ])
      ]),
      transition(':leave', [
        sequence([
          group([
            query(':self', [animate('200ms ease-out', style({
              height: '0'
            }))], {optional: true}),
            query('.msg-container', [animate('300ms ease-out', style({
              transform: 'translateY(100%)'
            }))], {optional: true})
          ])
        ])
      ])
    ])
  ],
})
export class MessageComponent {
  @HostBinding('@HeightDown') MyanimateContainer;
  @Output() hideContainer = new EventEmitter();

  isError: boolean;
  isInfo: boolean;
  isWarning: boolean;
  isSuccess: boolean;

  message: string;
  title: string;

  public popErrorMessage(title: string, text: string): void {
    this.isError = true;
    this.isInfo = false;
    this.isWarning = false;
    this.isSuccess = false;

    this.message = text;
    this.title = title;
  }

  public popInfoMessage(title: string, text: string): void {
    this.isError = false;
    this.isInfo = true;
    this.isWarning = false;
    this.isSuccess = false;

    this.message = text;
    this.title = title;
  }

  public popWarningMessage(title: string, text: string): void {
    this.isError = false;
    this.isInfo = false;
    this.isWarning = true;
    this.isSuccess = false;

    this.message = text;
    this.title = title;
  }

  public popSuccessMessage(title: string, text: string): void {
    this.isError = false;
    this.isInfo = false;
    this.isWarning = false;
    this.isSuccess = true;

    this.message = text;
    this.title = title;
  }

  hideMessage(): void {
    if (this.hideContainer != null) {
      this.hideContainer.emit(null);
    }
  }
}
