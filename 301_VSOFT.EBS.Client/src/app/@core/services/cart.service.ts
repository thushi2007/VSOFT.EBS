import {Injectable} from '@angular/core';
import {ArticleDto} from '../../pages/ebooks/models/articledto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: ArticleDto[];

  totalAmount = 0;

  constructor() {
    this.reset();
  }

  addToCart(article: ArticleDto): void {
    this.totalAmount += article.Price;
    this.items.push(article);
  }

  removeFromCart(idx: number): void {
    const art = this.items[idx];
    if (art != null) {
      this.totalAmount -= art.Price;
      this.items.splice(idx, 1);
    }
  }

  reset(): void {
    this.items = [];
    this.totalAmount = 0;
  }
}

