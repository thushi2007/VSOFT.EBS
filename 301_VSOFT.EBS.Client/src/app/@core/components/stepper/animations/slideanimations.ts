import {animate, state, style, transition, trigger} from '@angular/animations';

export function showHide() {
  return trigger('showHide', [
    state('false', style({
      display: 'none'
    })),
    state('true', style({
      display: 'block'
    })),
    transition('1 => 0', animate('400ms ease-out')),
    transition('0 => 1', animate('0ms ease-in'))
  ]);
}
