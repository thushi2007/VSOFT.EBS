import {Component, HostBinding, Input} from '@angular/core';
import {Router} from '@angular/router';
import {animate, group, query, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ebs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('selectedNot', [
      state('0', style({
        color: '#000000',
        background: '#eeeeee'
      })),
      state('1', style({
        background: '#0049b1',
        color: '#ffffff'
      })),
      transition('1 => 0', [
        group([
          query('.arrowbefore', style({
            'border-top': '30px solid transparent',
            'border-bottom': '30px solid transparent'
          })),
          query('.arrownext', style({
            'border-top': '25px solid transparent',
            'border-bottom': '25px solid transparent'
          })),
          animate('300ms')
        ])
      ]),
      transition('0 => 1', [
        group([
          query('.arrowbefore', style({
            'border-top': '30px solid #0049b1',
            'border-bottom': '30px solid #0049b1'
          })),
          query('.arrownext', style({
            'border-left': '25px solid #0049b1'
          })),
          animate('300ms')
        ])
      ])
    ])
  ]
})
export class HeaderComponent {
  @Input() Text: string;
  @Input() Index: string;
  @Input() Pattern: string[];

  @HostBinding('@selectedNot')
  get selectedNot(): boolean {
    return this.Pattern?.indexOf(this.router.url) > -1;
  }

  @HostBinding('class.selected')
  get selected(): boolean {
    return this.Pattern?.indexOf(this.router.url) > -1;
  }

  constructor(private router: Router) {
  }
}
