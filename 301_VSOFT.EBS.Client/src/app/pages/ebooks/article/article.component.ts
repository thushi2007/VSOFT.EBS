import {Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ArticleDto} from '../models/articledto';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CartService} from '@core/services';
import {ApiService} from '@core/services/api.service';
import {ImageDto} from '../models/imagedto';
import {NgImageSliderComponent} from 'ng-image-slider';
import {Lightbox} from 'ngx-lightbox';

@Component({
  selector: 'ebs-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: [
    trigger('animatePriceBox', [
      state('void', style({
        transform: 'translateY(100%)',
        opacity: 0
      }), {params: {delay: 0}}),
      state('*', style({
        transform: 'translateY(0%)',
        opacity: 1
      }), {params: {delay: 0}}),
      transition('void => *', animate('300ms {{delay}}ms')),
      transition('* => void', animate('300ms'))
    ])
  ]
})
export class ArticleComponent implements OnInit {
  @ViewChild('nav') slider: NgImageSliderComponent;

  @HostBinding('@animatePriceBox') get animateRouter(): any {
    return {
      value: '0',
      params: {delay: (this.delay * 200)}
    };
  }

  @Input() article: ArticleDto;
  @Input() delay: number;

  @Output() afterAddToWarenkorb: EventEmitter<any> = new EventEmitter<any>();

  imagesLst: ImageDto[] = [];

  imageObject: Array<object> = [];
  imagePopup: any[] = [];

  constructor(private cartService: CartService,
              private apiService: ApiService,
              private lightbox: Lightbox) {

  }

  insertIntoCart(): void {
    this.cartService.addToCart(this.article);
    this.afterAddToWarenkorb.emit();
  }

  openImagePopup(): void {
    this.lightbox.open(this.imagePopup, 0);
  }

  async ngOnInit(): Promise<any> {
    this.imagesLst = await this.apiService.get(`/article/${this.article.Id}/image`).toPromise();

    this.imagesLst.forEach((img) => {
      this.imageObject.push({
        image: 'data:image/jpg;base64,' + img.ImageBase64,
        thumbImage: 'data:image/jpg;base64,' + img.ImageBase64,
      });

      this.imagePopup.push({
        src: 'data:image/jpg;base64,' + img.ImageBase64,
        thumb: 'data:image/jpg;base64,' + img.ImageBase64,
      });
    });
  }
}
