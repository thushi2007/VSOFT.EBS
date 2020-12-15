import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '@core/services/api.service';
import {CategoryDto} from './models/categorydto';
import {ArticleDto} from './models/articledto';
import {Meta, Title} from '@angular/platform-browser';
import {MessagerComponent} from '@core/components';

@Component({
  selector: 'ebs-ebooks',
  templateUrl: './ebooks.component.html',
  styleUrls: ['./ebooks.component.scss']
})
export class EbooksComponent implements OnInit {
  @ViewChild(MessagerComponent, {static: true}) msg: MessagerComponent;

  categoryMenu: CategoryDto[];
  articles: ArticleDto[];

  paths: any;

  constructor(private titleService: Title,
              private metaService: Meta,
              private apiService: ApiService) {
    this.paths = {
      Title: 'Artikel',
      Paths: [{
        Url: '/ebooks',
        Text: 'Artikel'
      }]
    };

    this.titleService.setTitle('Artikel');
    this.metaService.updateTag({name: 'description', content: 'Artikel'});
  }

  async ngOnInit(): Promise<any> {
    this.categoryMenu = await this.apiService.get('/category/menu').toPromise<CategoryDto[]>();
    this.articles = await this.apiService.get('/article').toPromise<ArticleDto[]>();
  }

  addToCart(): void {
    this.msg.popSuccessMessage('Warenkorb aktualisiert', 'Artikel wurde erfolgreich in den Warenkorb gelegt.');
  }
}
