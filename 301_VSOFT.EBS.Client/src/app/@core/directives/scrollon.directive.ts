import {Directive, ElementRef, HostListener, Inject, Output} from '@angular/core';
import {NgControl} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Directive({
  selector: '[aimScrollon]'
})
export class ScrollonDirective {
  @Output() fireAction: EventEmitter<any> = new EventEmitter();

  actionalreadyfired: boolean;

  elementPos: any;
  elementHeight: any;

  balanceTop: any;
  balanceBottom: any;

  @HostListener('window:scroll', ['$event']) onScrollEvent(event): any {
    const windowPos = document.documentElement.scrollTop - this.el.nativeElement.offsetHeight;
    const dif = windowPos - this.elementPos;

    const rangeTop = this.balanceTop;
    const rangeBottom = 0 - this.balanceTop;

    // fire only once for prevent double actions
    if ((dif <= rangeTop && dif >= rangeBottom)) {
      this.fireAction.emit();
      this.actionalreadyfired = true;
    }
  }

  constructor(public el: ElementRef, @Inject(DOCUMENT) private document: Document) {
    this.elementHeight = this.el.nativeElement.offsetHeight;
    this.elementPos = this.el.nativeElement.offsetTop - this.elementHeight;

    this.balanceTop = 30;
    this.balanceBottom = 30;

    this.actionalreadyfired = false;
  }
}
