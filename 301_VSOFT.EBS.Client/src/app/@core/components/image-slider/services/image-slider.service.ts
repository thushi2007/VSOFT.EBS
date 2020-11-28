import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageSliderService {
  private nextOfSubscriber = new Subject<any>();
  nextStep = this.nextOfSubscriber.asObservable();

  private previousOfSubscriber = new Subject<any>();
  previousStep = this.previousOfSubscriber.asObservable();

  totalSliders = 0;
  selectedSlide = 0;

  totalTitles = 0;
  totalSubTitles = 0;

  constructor() { }

  registerSlider(): Promise<number> {
    return new Promise<number>((resolve) => {
      this.totalSliders += 1;
      resolve((this.totalSliders - 1));
    });
  }

  registerTitle(): Promise<number> {
    return new Promise<number>((resolve) => {
      this.totalTitles += 1;
      resolve((this.totalTitles - 1));
    });
  }

  registerSubTitle(): Promise<any> {
    return new Promise<number>((resolve) => {
      this.totalSubTitles += 1;
      resolve((this.totalSubTitles - 1));
    });
  }

  next(): void {
    if ((this.totalSliders - 1) !== this.selectedSlide) {
      this.selectedSlide += 1;
      this.nextOfSubscriber.next();
    } else {
      for (let i = 0; i < (this.totalSliders - 1); i++) {
        const timerTime = i * 800;
        setTimeout(() => {
          this.previous();
        }, timerTime);
      }
    }
  }

  previous(): void {
    if (0 !== this.selectedSlide) {
      this.selectedSlide -= 1;
      this.previousOfSubscriber.next();
    } else {
      for (let i = 0; i < (this.totalSliders - 1); i++) {
        const timerTime = i * 800;

        setTimeout(() => {
          this.next();
        }, timerTime);
      }
    }
  }

  reset(): void {
    this.totalSliders = 0;
    this.selectedSlide = 0;

    this.totalTitles = 0;
    this.totalSubTitles = 0;
  }
}
