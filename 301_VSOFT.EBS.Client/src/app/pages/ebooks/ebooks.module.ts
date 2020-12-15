import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EbooksRoutingModule} from './ebooks-routing.module';
import {EbooksComponent} from './ebooks.component';
import {CategoryComponent} from './category/category.component';
import {SubcategoryComponent} from './category/subcategory/subcategory.component';
import { ArticleComponent } from './article/article.component';
import {MatButtonModule} from '@angular/material/button';
import {CoreModule} from '@core/core.module';
import {NgImageSliderModule} from 'ng-image-slider';

@NgModule({
  declarations: [
    EbooksComponent,
    CategoryComponent,
    SubcategoryComponent,
    ArticleComponent
  ],
    imports: [
        CommonModule,
        EbooksRoutingModule,
        MatButtonModule,
        CoreModule,
        NgImageSliderModule
    ]
})
export class EbooksModule {
}
