// core modules
import {Subscription} from 'rxjs';
import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';

// own services
import {ImageSliderService} from '@core/components/image-slider/services/image-slider.service';

// animations
import {animate, AnimationBuilder, AnimationPlayer, style} from '@angular/animations';

@Component({
  selector: 'ebs-img-slide',
  templateUrl: './img-slide.component.html',
  styleUrls: ['./img-slide.component.scss'],
})
export class ImgSlideComponent implements OnInit, OnDestroy {
  @Input() bgImg: string;
  @Input() bgPos: string;

  slideIndex = 0;

  get selected(): boolean {
    return this.slideIndex === this.sliderService.selectedSlide;
  }

  nextSubscription: Subscription;
  previousSubscription: Subscription;

  public player: AnimationPlayer;

  constructor(private sliderService: ImageSliderService,
              private animationBuilder: AnimationBuilder,
              private elementRef: ElementRef) {
    this.sliderService.registerSlider().then((indx) => {
      this.slideIndex = indx;
    });
  }

  ngOnInit(): void {
    this.nextSubscription = this.sliderService.nextStep.subscribe(() => {
      if (this.selected) {
        this.showMeFromRight();
      } else {
        this.hideMeFromRight();
      }
    });

    this.previousSubscription = this.sliderService.previousStep.subscribe(() => {
      if (this.selected) {
        this.showMeFromLeft();
      } else {
        this.hideMeFromLeft();
      }
    });

    this.initialShow();
  }

  initialShow(): void {
    this.player = this.animationBuilder
      .build([
        style({
          opacity: 0
        }),
        animate('600ms', style({
          opacity: 1
        }))
      ]).create(this.elementRef.nativeElement);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }

  showMeFromRight(): void {
    const transformPositionShow = 0 - (this.sliderService.selectedSlide * 100);
    const transformPositionHide = transformPositionShow + 100;

    this.player = this.animationBuilder
      .build([
        style({
          opacity: 0,
          transform: 'translateX(' + transformPositionHide + '%)'
        }),
        animate('800ms', style({
          opacity: 1,
          transform: 'translateX(' + transformPositionShow + '%)'
        }))
      ]).create(this.elementRef.nativeElement);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }

  showMeFromLeft(): void {
    const transformPositionShow = 0 - (this.sliderService.selectedSlide * 100);
    const transformPositionHide = transformPositionShow - 100;

    this.player = this.animationBuilder
      .build([
        style({
          opacity: 0,
          transform: 'translateX(' + transformPositionHide + '%)'
        }),
        animate('800ms', style({
          opacity: 1,
          transform: 'translateX(' + transformPositionShow + '%)'
        }))
      ]).create(this.elementRef.nativeElement);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }

  hideMeFromRight(): void {
    const transformPositionShow = 0 - (this.sliderService.selectedSlide * 100);
    const transformPositionHide = transformPositionShow + 100;

    this.player = this.animationBuilder
      .build([
        style({
          transform: 'translateX(' + transformPositionHide + '%)'
        }),
        animate('800ms', style({
          transform: 'translateX(' + transformPositionShow + '%)'
        }))
      ]).create(this.elementRef.nativeElement);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }

  hideMeFromLeft(): void {
    const transformPositionShow = 0 - (this.sliderService.selectedSlide * 100);
    const transformPositionHide = transformPositionShow - 100;

    this.player = this.animationBuilder
      .build([
        style({
          transform: 'translateX(' + transformPositionHide + '%)'
        }),
        animate('800ms', style({
          transform: 'translateX(' + transformPositionShow + '%)'
        }))
      ]).create(this.elementRef.nativeElement);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.nextSubscription) {
      this.nextSubscription.unsubscribe();
    }

    if (this.previousSubscription) {
      this.previousSubscription.unsubscribe();
    }

    this.player.destroy();
  }
}
