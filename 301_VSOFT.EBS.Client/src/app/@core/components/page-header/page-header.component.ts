import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {
  animate, animateChild,
  group,
  query, sequence,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'ebs-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  animations: [
    trigger('routerAnimations', [
      transition('* <=> *', [
        sequence([
          group([
            /* both variants are important! Do not remove one of them */
            query('@showPageTitle', animateChild(), {optional: true}),
            query('@showPageSubTitle', animateChild(), {optional: true})
          ])
        ])
      ]),
    ]),
    trigger('showPageTitle', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(100%)'
        }),
        animate('0.4s', style({
          opacity: 1,
          transform: 'translateY(0%)'
        }))
      ]),
      transition('* => void', [
        animate('0.3s', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ]),
    trigger('showPageSubTitle', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(100%)'
        }),
        animate('0.4s', style({
          opacity: 1,
          transform: 'translateY(0%)'
        }))
      ]),
      transition('* => void', [
        animate('0.3s', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class PageHeaderComponent implements OnInit {
  @HostBinding('@routerAnimations') showhideme;

  @Input() pagePath: any;

  constructor() {
  }

  ngOnInit(): void {
  }
}
