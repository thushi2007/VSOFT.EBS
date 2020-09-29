import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {animate, AnimationBuilder, AnimationPlayer, state, style, transition, trigger} from '@angular/animations';

import {Subscription} from 'rxjs';

// own animations
import {Router} from '@angular/router';
import {StepperService} from '@core/components/stepper/services/stepper.service';

@Component({
  selector: 'ebs-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  animations: [
    trigger('showHide', [
      state('false', style({
        display: 'none'
      })),
      state('true', style({
        display: 'block'
      })),
      transition('1 => 0', animate('400ms ease-out')),
      transition('0 => 1', animate('0ms ease-in'))
    ])
  ]
})
export class StepComponent implements OnInit, OnDestroy {
  stepIndex = 0;
  player: AnimationPlayer;

  @Input() stepUrl;

  get selected(): boolean {
    return this.stepUrl === this.router.url;
  }

  nextSubscription: Subscription;
  previousSubscription: Subscription;

  constructor(private stepperService: StepperService,
              private animationBuilder: AnimationBuilder,
              private elementRef: ElementRef,
              private router: Router) {

  }

  ngOnInit(): void {
    this.stepperService.registerStep(this.stepUrl, this).then((indx) => {
      this.stepIndex = indx;
    });

    this.nextSubscription = this.stepperService.nextStep.subscribe(() => {
      if (this.selected) {
        this.showMeFromRight();
      } else {
        this.hideMeFromRight();
      }

      window.scrollTo(0, 0);
    });

    this.previousSubscription = this.stepperService.previousStep.subscribe(() => {
      if (this.selected) {
        this.showMeFromLeft();
      } else {
        this.hideMeFromLeft();
      }

      window.scrollTo(0, 0);
    });
  }

  showMeFromRight(): void {
    const transformPositionShow = 0 - (this.stepperService.selectedStep * 100);
    const transformPositionHide = transformPositionShow + 100;

    this.player = this.animationBuilder
      .build([
        style({
          transform: 'translateX(' + transformPositionHide + '%)'
        }),
        animate('400ms', style({
          transform: 'translateX(' + transformPositionShow + '%)'
        }))
      ]).create(this.elementRef.nativeElement);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }

  showMeFromLeft(): void {
    const transformPositionShow = 0 - (this.stepperService.selectedStep * 100);
    const transformPositionHide = transformPositionShow - 100;

    this.player = this.animationBuilder
      .build([
        style({
          transform: 'translateX(' + transformPositionHide + '%)'
        }),
        animate('400ms', style({
          transform: 'translateX(' + transformPositionShow + '%)'
        }))
      ]).create(this.elementRef.nativeElement);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }

  hideMeFromRight(): void {
    const transformPositionShow = 0 - (this.stepperService.selectedStep * 100);
    const transformPositionHide = transformPositionShow + 100;

    this.player = this.animationBuilder
      .build([
        style({
          transform: 'translateX(' + transformPositionHide + '%)'
        }),
        animate('400ms', style({
          transform: 'translateX(' + transformPositionShow + '%)'
        }))
      ]).create(this.elementRef.nativeElement);

    setTimeout(() => {
      this.player.play();
    }, 0);
  }

  hideMeFromLeft(): void {
    const transformPositionShow = 0 - (this.stepperService.selectedStep * 100);
    const transformPositionHide = transformPositionShow - 100;

    this.player = this.animationBuilder
      .build([
        style({
          transform: 'translateX(' + transformPositionHide + '%)'
        }),
        animate('400ms', style({
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
  }
}
