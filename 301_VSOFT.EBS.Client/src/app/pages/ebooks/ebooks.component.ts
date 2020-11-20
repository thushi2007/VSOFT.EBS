import {Component, OnInit} from '@angular/core';
import {ApiService} from '@core/services/api.service';
import {CategoryDto} from './models/categorydto';
import {ArticleDto} from './models/articledto';

@Component({
  selector: 'ebs-ebooks',
  templateUrl: './ebooks.component.html',
  styleUrls: ['./ebooks.component.scss']
})
export class EbooksComponent implements OnInit {
  categoryMenu: CategoryDto[];
  articles: ArticleDto[];

  constructor(private apiService: ApiService) {
  }

  async ngOnInit(): Promise<any> {
    this.categoryMenu = await this.apiService.get('/category/menu').toPromise<CategoryDto[]>();
    this.articles = await this.apiService.get('/article/all').toPromise<ArticleDto[]>();
  }
}
