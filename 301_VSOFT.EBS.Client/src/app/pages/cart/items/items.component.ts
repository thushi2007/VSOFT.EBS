import {Component, OnInit} from '@angular/core';
import {ArticleDto} from '../../ebooks/models/articledto';
import {CartService} from '@core/services';

@Component({
  selector: 'ebs-cart-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  get items(): ArticleDto[] {
    return this.cartService.items;
  }

  get totalCHF(): number {
    return this.cartService.totalAmount;
  }

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  removeItemFromCart(indx: number): void {
    this.cartService.removeFromCart(indx);
  }
}
