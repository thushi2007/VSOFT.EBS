import {Component, HostBinding} from '@angular/core';
import {animate, group, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ebs-promise-button-spinner',
  templateUrl: './promise-button-spinner.component.html',
  styleUrls: ['./promise-button-spinner.component.scss'],
  animations: [
    trigger('SlideDownUp', [
      transition(':enter', [
        group([
          query('.container', [
            style({
              width: '0px'
            }),
            animate('300ms', style({
              width: '*'
            }))
          ])
        ])
      ]),
      transition(':leave', [
        group([
          query('.container', [
            style({
              width: '*'
            }),
            animate('300ms', style({
              width: '0px'
            }))
          ])
        ])
      ])
    ])
  ]
})
export class PromiseButtonSpinnerComponent {
  @HostBinding('@SlideDownUp') MyanimateContainer;

  constructor() {
  }
}
