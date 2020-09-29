import {animate, state, style, transition, trigger, query, sequence, group, animateChild} from '@angular/animations';

export function selectDeselect() {
  return trigger('selectDeselect', [
    state('false', style({
      color: '#aaaaaa',
      'font-weight': 'unset'
    })),
    state('true', style({
      color: '#0160e7',
      'font-weight': '700'
    })),
    transition('1 => 0', [
      group([
        query('@selectDeselectIcon', animateChild()),
        animate('400ms')
      ])
    ]),
    transition('0 => 1', [
      group([
        query('@selectDeselectIcon', animateChild()),
        animate('400ms')
      ])
    ])
  ]);
}

export function selectDeselectIcon() {
  return trigger('selectDeselectIcon', [
    state('false', style({
      'background-color': '#aaaaaa'
    })),
    state('true', style({
      'background-color': '#0160e7'
    })),
    transition('1 => 0', animate('400ms')),
    transition('0 => 1', animate('400ms'))
  ]);
}
