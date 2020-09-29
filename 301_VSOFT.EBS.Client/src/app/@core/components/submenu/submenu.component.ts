import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {MenuService} from '@core/services/menu.service';
import {animate, animateChild, group, query, sequence, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ebs-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
  animations: [
    // trigger('routerAnimations', [
    //   transition('* <=> *', [
    //     query('@showhideme', animateChild(), {optional: true})
    //   ]),
    // ]),
    trigger('showhideme', [
      transition('void => *', [
        style({
          transform: 'translateY(100%)'
        }),
        animate('0.4s', style({
          transform: 'translateY(0%)'
        }))
      ]),
      transition('* => void', [
        animate('0.3s', style({
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class SubmenuComponent implements OnInit {
  // @HostBinding('@routerAnimations') animateMe: any;

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
