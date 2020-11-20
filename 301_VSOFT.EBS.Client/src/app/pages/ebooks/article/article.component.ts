import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {ArticleDto} from '../models/articledto';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ebs-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: [
    trigger('animatePriceBox', [
      state('void', style({
        transform: 'translateY(100%)',
        opacity: 0
      }), {params: {delay: 0}}),
      state('*', style({
        transform: 'translateY(0%)',
        opacity: 1
      }), {params: {delay: 0}}),
      transition('void => *', animate('300ms {{delay}}ms')),
      transition('* => void', animate('300ms'))
    ])
  ]
})
export class ArticleComponent implements OnInit {
  @HostBinding('@animatePriceBox') get animateRouter() {
    return {
      value: '0',
      params: {delay: (this.delay * 200)}
    };
  }

  @Input() article: ArticleDto;
  @Input() delay: number;

  constructor() {

  }

  ngOnInit(): void {

  }
}
