import {Component, OnInit} from '@angular/core';
import {BasedialogcompComponent} from '@core/components/dialoger/inheritance/basedialogcomp/basedialogcomp.component';
import {ApiService} from '@core/services/api.service';
import {CreateArticleDto} from './createarticledto';
import {Observable} from 'rxjs';
import {EnumModel} from '@core/models/enummodel';

@Component({
  selector: 'ebs-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.scss']
})
export class CreatearticleComponent extends BasedialogcompComponent implements OnInit {
  articleDto = new CreateArticleDto();
  subCategories: EnumModel[];
  languages: EnumModel[];


  constructor(private apiService: ApiService) {
    super();
  }

  displayFn(article: EnumModel): string {
    console.log(article);
    return article && article.Value ? article.Value : '';
  }

  async ngOnInit(): Promise<any> {
    this.subCategories = await this.apiService.get('/subcategory/enum').toPromise();
    this.languages = await this.apiService.get('/enum/languages').toPromise();
  }
}
