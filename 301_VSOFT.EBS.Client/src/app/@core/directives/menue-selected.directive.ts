import {Directive, Input, OnInit, OnDestroy, HostBinding} from '@angular/core';
import {Subscription} from 'rxjs';

import {Router, ActivatedRoute} from '@angular/router';

@Directive({
  selector: '[ebsMenueSelected]'
})
export class MenueSelectedDirective implements OnInit, OnDestroy {
  @HostBinding('class.selected') isSelectedMenu = false;
  @Input() menuselected: string;

  routers: Subscription;
  routersub: Subscription;

  constructor(private activeRouter: ActivatedRoute, private router: Router) {
  }

  public ngOnInit(): void {
    this.routers = this.router.events.subscribe((data: any) => {
      this.isSelectedMenu = data.url && data.url.indexOf(this.menuselected) !== -1;
    });

    this.routersub = this.activeRouter.params.subscribe(params => {
      this.isSelectedMenu = this.router.url && this.router.url.indexOf(this.menuselected) !== -1;
    });
  }

  ngOnDestroy(): void {
    this.routers.unsubscribe();
    this.routersub.unsubscribe();
  }
}
