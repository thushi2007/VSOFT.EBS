import {Component, HostBinding, Input} from '@angular/core';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('300ms'))
    ]),
    trigger('selecteFirstdNot', [
      state('0', style({
        'border-top': '30px solid #eeeeee',
        'border-bottom': '30px solid #eeeeee'
      })),
      state('1', style({
        'border-top': '30px solid #0049b1',
        'border-bottom': '30px solid #0049b1'
      })),
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('300ms'))
    ]),
    trigger('selecteLastdNot', [
      state('0', style({
        'border-left': '25px solid #eeeeee'
      })),
      state('1', style({
        'border-left': '25px solid #0049b1'
      })),
      transition('1 => 0', animate('300ms')),
      transition('0 => 1', animate('300ms'))
    ])
  ]
})
export class HeaderComponent {
  @Input() Text: string;
  @Input() Index: string;
  @Input() Pattern: string[];

  @HostBinding('class.selected')
  get selected(): boolean {
    return this.Pattern?.indexOf(this.router.url) > -1;
  }

  isSelected(): boolean {
    return this.Pattern?.indexOf(this.router.url) > -1;
  }

  constructor(private router: Router) {
  }
}
