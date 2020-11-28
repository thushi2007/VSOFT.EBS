import {Component, Input, OnInit} from '@angular/core';
import {CategoryDto} from '../models/categorydto';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ebs-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
    trigger('openCloseSubCategory', [
      state('1', style({
        height: '*'
      })),
      state('0', style({
        height: '0px'
      })),
      transition('1 => 0', animate('300ms ease-out')),
      transition('0 => 1', animate('300ms ease-in'))
    ]),
    trigger('rotateUpDown', [
      state('0', style({
        transform: 'rotate(0)'
      })),
      state('1', style({
        transform: 'rotate(90deg)'
      })),
      transition('1 => 0', animate('300ms ease-out')),
      transition('0 => 1', animate('300ms ease-in'))
    ])
  ]
})
export class CategoryComponent implements OnInit {
  @Input() category: CategoryDto;
  @Input() subMenuOpened = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  openSubMenu(): void {
    this.subMenuOpened = !this.subMenuOpened;
  }
}
