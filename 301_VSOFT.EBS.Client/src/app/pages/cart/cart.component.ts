import {Component, OnInit} from '@angular/core';
import {CartService} from '@core/services';
import {ArticleDto} from '../ebooks/models/articledto';

@Component({
  selector: 'ebs-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  paths: any;

  get items(): ArticleDto[] {
    return this.cartService.items;
  }

  constructor(private cartService: CartService) {
    this.paths = {
      Title: 'Warenkorb',
      Paths: [{
        Url: '/cart',
        Text: 'Warenkorb'
      }]
    };
  }

  ngOnInit(): void {
  }

}
