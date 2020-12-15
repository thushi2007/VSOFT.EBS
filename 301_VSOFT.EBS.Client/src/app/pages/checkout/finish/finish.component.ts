import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CartService} from '@core/services';
import {Router} from '@angular/router';

@Component({
  selector: 'ebs-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent implements OnInit {

  constructor(private cartService: CartService,
              public router: Router) {
    if (this.cartService.items.length === 0) {
      this.router.navigateByUrl('cart');
    }
  }

  ngOnInit(): void {
    this.cartService.reset();
  }
}
