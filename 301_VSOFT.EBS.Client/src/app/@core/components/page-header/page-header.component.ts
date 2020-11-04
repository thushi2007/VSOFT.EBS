import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {
  animate, group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'ebs-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  animations: [
    trigger(
      'showHideHeader',
      [
        transition(':enter',
          group([
            query('.page-container', [
              style({
                opacity: 0,
                transform: 'translateY(100%)'
              }), animate('0.3s',
                style({
                  opacity: 1,
                  transform: 'translateY(0%)'
                }))], {optional: true}),
            query('.path', [
              style({
                opacity: 0,
                transform: 'translateY(100%)'
              }), animate('0.3s',
                style({
                  opacity: 1,
                  transform: 'translateY(0%)'
                }))], {optional: true}),
          ])),
        transition(':leave',
          group([
            query('.page-container', [
              style({
                opacity: 1,
                transform: 'translateY(0%)'
              }), animate('0.3s',
                style({
                  opacity: 0,
                  transform: 'translateY(100%)'
                }))], {optional: true}),
            query('.path', [
              style({
                opacity: 1,
                transform: 'translateY(0%)'
              }), animate('0.3s',
                style({
                  opacity: 0,
                  transform: 'translateY(100%)'
                }))], {optional: true}),
          ]))
      ]
    )
  ]
})
export class PageHeaderComponent implements OnInit {
  @HostBinding('@showHideHeader') showHideHeader;

  @Input() pagePath: any;

  constructor() {
  }

  ngOnInit(): void {
  }
}
