import {Component, HostBinding, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ebs-submenu-item',
  templateUrl: './submenu-item.component.html',
  styleUrls: ['./submenu-item.component.scss']
})
export class SubmenuItemComponent implements OnInit, OnDestroy {
  @Input() url;
  @Input() text;

  isHover = false;
  isSelected = false;

  urlchangedSub: Subscription;

  @HostListener('mouseover') onMouseOver(): any {
    this.isHover = true;
  }

  @HostListener('mouseleave') onMouseLeave(): any {
    this.isHover = false;
  }

  @HostBinding('class.selected') get selected(): any {
    return this.isSelected;
  }

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.urlchangedSub = this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.selectMenuItem();
        }
      });

    this.selectMenuItem();
  }

  selectMenuItem(): void {
    this.isSelected = (this.url && this.router.url.includes(this.url));
  }

  ngOnDestroy(): void {
    if (this.urlchangedSub) {
      this.urlchangedSub.unsubscribe();
    }
  }
}
