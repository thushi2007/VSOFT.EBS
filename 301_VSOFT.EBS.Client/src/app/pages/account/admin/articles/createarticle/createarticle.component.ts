import {Component, OnInit, ViewChild} from '@angular/core';
import {BasedialogcompComponent} from '@core/components/dialoger/inheritance/basedialogcomp/basedialogcomp.component';
import {ApiService} from '@core/services/api.service';
import {CreateArticleDto} from './createarticledto';
import {EnumModel} from '@core/models/enummodel';
import {FormValidationDirective} from '@core/directives';
import {ImageUploaderComponent, MessagerComponent} from '@core/components';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'ebs-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.scss']
})
export class CreatearticleComponent extends BasedialogcompComponent implements OnInit {
  @ViewChild(FormValidationDirective, {static: true}) updateProfileFirm: FormValidationDirective;
  @ViewChild(ImageUploaderComponent, {static: true}) imageUploader: ImageUploaderComponent;
  @ViewChild(MessagerComponent, {static: true}) msg: MessagerComponent;

  articleDto = new CreateArticleDto();

  subCategories: EnumModel[];
  languages: EnumModel[];
  publishers: EnumModel[];
  authors: EnumModel[];

  files: any[];

  constructor(private apiService: ApiService) {
    super();
    this.files = [];
  }

  displayFn(article: EnumModel): string {
    return article && article.Value ? article.Value : '';
  }

  async ngOnInit(): Promise<any> {
    this.subCategories = await this.apiService.get('/subcategory/enum').toPromise();
    this.languages = await this.apiService.get('/enum/languages').toPromise();
    this.publishers = await this.apiService.get('/publisher/enum').toPromise();
    this.authors = await this.apiService.get('/author/enum').toPromise();
  }

  setFiles(filesLst: any[]): void {
    this.files = filesLst;
  }

  getSuccessPromise(): Promise<boolean> {
    return new Promise<any>((resolve, reject) => {
      this.updateProfileFirm.isValid.then((valid) => {
        if (valid) {
          this.apiService.post('/article', this.articleDto).toPromise().then((artDto: any) => {
            this.articleDto = artDto;
            if (this.imageUploader.items.length > 0) {
              this.imageUploader.uploadAll(environment.apiUrl + `/article/${this.articleDto.Id}/image`).then(() => {
                resolve(true);
              });
            } else {
              resolve(resolve);
            }
          }, error => {
            this.msg.popErrorMessage('Fehler!', error.message);
            reject(false);
          });
        } else {
          this.msg.popErrorMessage('Fehler!', 'Bitte füllen Sie alle nötigen Felder aus.');
          reject(false);
        }
      });
    });
  }
}
