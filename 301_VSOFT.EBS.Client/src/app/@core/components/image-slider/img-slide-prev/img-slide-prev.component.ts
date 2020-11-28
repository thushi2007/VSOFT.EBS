import {Component, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

// own services
import {slideInLeftOnEnterAnimation, slideOutLeftOnLeaveAnimation} from 'angular-animations';

@Component({
  selector: 'ebs-img-slide-prev',
  templateUrl: './img-slide-prev.component.html',
  styleUrls: ['./img-slide-prev.component.scss'],
  animations: [
    slideInLeftOnEnterAnimation({anchor: 'showFromLeft', duration: 300}),
    slideOutLeftOnLeaveAnimation({anchor: 'hideFromLeft', duration: 300})
  ]
})
export class ImgSlidePrevComponent {
  @Output() prevSlideAction = new EventEmitter();

  @HostBinding('@showFromLeft') showFromLeft;
  @HostBinding('@hideFromLeft') hideFromLeft;

  @HostListener('click') onClick(): any {
    this.prevSlideAction.emit();
  }

  constructor() {
  }
}
