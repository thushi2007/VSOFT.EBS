import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {fadeInUpAnimation, fadeOutDownAnimation} from 'angular-animations';
import {ImageSliderService} from '@core/components/image-slider/services/image-slider.service';
import {animate, AnimationBuilder, AnimationPlayer, style} from '@angular/animations';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ebs-img-slide-title',
  templateUrl: './img-slide-title.component.html',
  styleUrls: ['./img-slide-title.component.scss'],
  animations: [
    fadeInUpAnimation({anchor: 'fadeInUp', delay: 800}),
    fadeOutDownAnimation({anchor: 'fadeOutDown', delay: 800})
  ]
})
export class ImgSlideTitleComponent implements OnInit, OnDestroy {
  titleIndex = 0;

  nextSubscription: Subscription;
  previousSubscription: Subscription;

  public player: AnimationPlayer;

  constructor(private sliderService: ImageSliderService,
              private animationBuilder: AnimationBuilder,
              private elementRef: ElementRef) {
    this.sliderService.registerTitle().then((indx) => {
      this.titleIndex = indx;
    });
  }

  show(): void {
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

  hide(): void {
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

  updateView(): void {
    if (this.titleIndex === this.sliderService.selectedSlide) {
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
