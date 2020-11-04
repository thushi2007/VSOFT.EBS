import {AfterViewInit, Component, HostListener, Inject, OnDestroy, PLATFORM_ID} from '@angular/core';
import {ImageSliderService} from '@core/components/image-slider/services/image-slider.service';
import {Subscription, timer} from 'rxjs';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'ebs-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  providers: [ImageSliderService]
})
export class ImageSliderComponent implements AfterViewInit, OnDestroy {
  showNavi = false;

  timeOut = 5000;
  timerSub: Subscription;

  isBrowser = false;

  @HostListener('mouseover') onMouseOver(): any {
    this.showNavi = true;
  }

  @HostListener('mouseleave') onMouseLeave(): any {
    this.showNavi = false;
  }

  @HostListener('swipeleft') swipeleft(): any {
    this.next();
  }

  @HostListener('swiperight') swiperight(): any {
    this.previous();
  }

  constructor(private sliderService: ImageSliderService, @Inject(PLATFORM_ID) platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.sliderService.reset();
  }

  startTimer(): void {
    this.timerSub = timer(this.timeOut, this.timeOut).subscribe(t => {
      this.sliderService.next();
    });
  }

  previous(): void {
    this.resetTimer().then(() => {
      this.sliderService.previous();
      setTimeout(() => {
        this.startTimer();
      }, 800);
    });
  }

  next(): void {
    console.log('bin drin');
    this.resetTimer().then(() => {
      this.sliderService.next();
      setTimeout(() => {
        this.startTimer();
      }, 800);
    });
  }

  resetTimer(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.timerSub) {
        this.timerSub.unsubscribe();
        resolve();
      }
      reject();
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }
}
