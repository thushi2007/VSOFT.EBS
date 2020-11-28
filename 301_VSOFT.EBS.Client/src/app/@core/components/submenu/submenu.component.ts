import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {MenuService} from '@core/services/menu.service';
import {animate, group, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ebs-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
  // animations: [
  //   trigger(
  //     'showHideSubMenu',
  //     [
  //       transition(':enter',
  //         group([
  //           query('.submenu-container', [
  //             style({
  //               opacity: 0,
  //               transform: 'translateY(100%)'
  //             }), animate('0.3s',
  //               style({
  //                 opacity: 1,
  //                 transform: 'translateY(0%)'
  //               }))], {optional: true})
  //         ])),
  //       transition(':leave',
  //         group([
  //           query('.submenu-container', [
  //             style({
  //               opacity: 1,
  //               transform: 'translateY(0%)'
  //             }), animate('0.3s',
  //               style({
  //                 opacity: 0,
  //                 transform: 'translateY(100%)'
  //               }))], {optional: true})
  //         ]))
  //     ]
  //   )
  // ]
})
export class SubmenuComponent implements OnInit {
/*  @HostBinding('@showHideSubMenu') showHideSubMenu: any;*/

  @Input() url;

  isHover = false;
  itemWithChildren: any;

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    if (this.url) {
      const itms = this.menuService.getMenuItemWithChildren(this.url);

      if (itms && itms[0]) {
        this.itemWithChildren = itms[0];
      }
    }
  }
}
