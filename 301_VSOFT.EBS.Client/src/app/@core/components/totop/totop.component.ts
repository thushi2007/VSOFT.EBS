import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ScrolltotopService} from '@core/components/totop/services/scrolltotop.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'ebs-totop',
  templateUrl: './totop.component.html',
  styleUrls: ['./totop.component.scss']
})
export class TotopComponent implements OnInit, OnDestroy {
  windowScrolled: boolean;

  urlchangedSub: Subscription;
  toTopSub: Subscription;

  constructor(private router: Router, private scrolltoTop: ScrolltotopService) {
    this.toTopSub = this.scrolltoTop.scrollTop.subscribe(() => {
      this.scrollToTop();
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): any {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  scrollToTop(): any {
    (function smoothscroll(): any {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  ngOnInit(): void {
    this.urlchangedSub = this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.scrollToTop();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.urlchangedSub) {
      this.urlchangedSub.unsubscribe();
    }
    if (this.toTopSub) {
      this.toTopSub.unsubscribe();
    }
  }
}
