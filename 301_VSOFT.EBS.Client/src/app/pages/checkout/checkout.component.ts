import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationStart, Router, RouterOutlet} from '@angular/router';
import {Subscription} from 'rxjs';
import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';
import {coreAnimations} from '@core/animations/routeranimation';

export const stepperSteps: any[] = [
  {
    HeaderText: 'Benutzerkonto',
    Pattern: [
      '/checkout/account'
    ]
  },
  {
    HeaderText: 'Artikel',
    Pattern: [
      '/checkout/items'
    ]
  },
  {
    HeaderText: 'Abschluss',
    Pattern: [
      '/checkout/finish'
    ]
  }
];

export const animationRight: any[] = [
  query(':enter, :leave',
    style({position: 'absolute', width: '100%', top: '0px', left: '0px'}), {optional: true}),
  group([
    query(':self', [
      style({height: '{{containerHeight}}px'}),
      animate('0.3s',
        style({height: '*'}))
    ], {optional: true}),
    query('@*', animateChild(), {optional: true}),
    query(':enter', [
      style({left: '100%'}),
      animate('0.35s',
        style({left: '0%'}))
    ], {optional: true}),
    query(':leave', [
      style({left: '0%'}),
      animate('0.35s',
        style({left: '-100%'}))
    ], {optional: true}),
  ])
];

export const animationLeft: any[] = [
  query(':enter, :leave',
    style({position: 'absolute', width: '100%', top: '0px', left: '0px'}), {optional: true}),
  group([
    query(':self', [
      style({height: '{{containerHeight}}px'}),
      animate('0.3s',
        style({height: '*'}))
    ], {optional: true}),
    query('@*', animateChild(), {optional: true}),
    query(':enter', [
      style({left: '-100%'}),
      animate('0.35s',
        style({left: '0%'}))
    ], {optional: true}),
    query(':leave', [
      style({left: '0%'}),
      animate('0.35s',
        style({left: '100%'}))
    ], {optional: true}),
  ])
];

@Component({
  selector: 'ebs-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [
    trigger('stepperAnimation', [
      transition('One => Two', animationRight, {params: {containerHeight: 0}}),
      transition('Two => One', animationLeft, {params: {containerHeight: 0}}),
      transition('Two => Four', animationRight, {params: {containerHeight: 0}}),
      transition('Four => Two', animationLeft, {params: {containerHeight: 0}}),
      transition('Two => Three', animationRight, {params: {containerHeight: 0}}),
      transition('Three => Two', animationLeft, {params: {containerHeight: 0}})
    ]), coreAnimations
  ]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild('routerContainer', {read: ElementRef, static: false}) routerContainer: ElementRef;

  height: number;
  steps: any[];

  paths: any;

  routerSub: Subscription;

  constructor(private router: Router) {
    this.steps = stepperSteps;
  }

  animationParams(outlet: RouterOutlet): any {
    return {
      value: outlet && outlet.activatedRouteData && outlet.activatedRouteData.animationState,
      params: {containerHeight: this.height}
    };
  }

  ngOnInit(): void {
    this.routerSub = this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.height = this.routerContainer.nativeElement.offsetHeight;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
