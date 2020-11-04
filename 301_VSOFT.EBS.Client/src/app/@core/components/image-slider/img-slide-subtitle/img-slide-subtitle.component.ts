import {Component, ElementRef, HostBinding, Input, OnDestroy, OnInit} from '@angular/core';
import {fadeInUpAnimation, fadeInUpOnEnterAnimation, fadeOutDownAnimation} from 'angular-animations';
import {ImageSliderService} from '@core/components/image-slider/services/image-slider.service';
import {Subscription} from 'rxjs';
import {animate, AnimationBuilder, AnimationPlayer, style} from '@angular/animations';

@Component({
  selector: 'slide-subtitle',
  templateUrl: './img-slide-subtitle.component.html',
  styleUrls: ['./img-slide-subtitle.component.scss']
})
export class ImgSlideSubtitleComponent implements OnInit, OnDestroy {
  subTitleIndex = 0;

  @Input() btnUrl: string;
  @Input() bgColor: string;

  nextSubscription: Subscription;
  previousSubscription: Subscription;

  public player: AnimationPlayer;

  constructor(private sliderService: ImageSliderService,
              private animationBuilder: AnimationBuilder,
              private elementRef: ElementRef) {
    this.sliderService.registerSubTitle().then((indx) => {
      this.subTitleIndex = indx;
    });
  }

  show() {
    this.player = this.animationBuilder
      .build([
        style({
          opacity: 0,
          transform: 'translateY(100%)'
        }),
        animate('600ms', style({
          opacity: 1,
          transform: 'translateY(0%)'
        }))
      ]).create(this.elementRef.nativeElement);

    setTimeout(() => {
      this.player.play();
    }, 800);
  }

  hide() {
    this.player = this.animationBuilder
      .build([
        style({
          opacity: 1,
          transform: 'translateY(0%)'
        }),
        animate('600ms', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ]).create(this.elementRef.nativeElement);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }

  ngOnInit(): void {
    this.nextSubscription = this.sliderService.nextStep.subscribe(() => {
      this.updateView();
    });

    this.previousSubscription = this.sliderService.previousStep.subscribe(() => {
      this.updateView();
    });

    this.updateView();
  }

  updateView() {
    if (this.subTitleIndex === this.sliderService.selectedSlide) {
      this.show();
    } else {
      this.hide();
    }
  }

  ngOnDestroy(): void {
    if (this.nextSubscription) {
      this.nextSubscription.unsubscribe();
    }

    if (this.previousSubscription) {
      this.previousSubscription.unsubscribe();
    }
  }
}
