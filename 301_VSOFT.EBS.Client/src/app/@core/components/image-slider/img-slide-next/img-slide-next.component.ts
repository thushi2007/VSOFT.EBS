import {Component, EventEmitter, HostBinding, HostListener, Output} from '@angular/core';

// own services
import {slideInRightOnEnterAnimation, slideOutRightOnLeaveAnimation} from 'angular-animations';

@Component({
  selector: 'ebs-img-slide-next',
  templateUrl: './img-slide-next.component.html',
  styleUrls: ['./img-slide-next.component.scss'],
  animations: [
    slideInRightOnEnterAnimation({anchor: 'showFromRight', duration: 300}),
    slideOutRightOnLeaveAnimation({anchor: 'hideToRight', duration: 300})
  ]
})
export class ImgSlideNextComponent {
  @Output() nextSlideAction = new EventEmitter();

  @HostBinding('@showFromRight') showFromRight;
  @HostBinding('@hideToRight') hideToRight;

  @HostListener('click') onClick(): any {
    this.nextSlideAction.emit();
  }

  constructor() {
  }
}
