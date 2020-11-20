import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {CoreModule} from '@core/core.module';
import {LanguagesComponent} from './languages/languages.component';
import {SalutationsComponent} from './salutations/salutations.component';
import {CategoriesComponent} from './categories/categories.component';
import {SubcategoriesComponent} from './subcategories/subcategories.component';
import {ArticlesComponent} from './articles/articles.component';
import {BuysComponent} from './buys/buys.component';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CreatearticleComponent } from './articles/createarticle/createarticle.component';
import {FormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {MatSelectModule} from '@angular/material/select';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AdminComponent,
    LanguagesComponent,
    SalutationsComponent,
    CategoriesComponent,
    SubcategoriesComponent,
    ArticlesComponent,
    BuysComponent,
    CreatearticleComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    FormsModule,
    NgxMaskModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatGoogleMapsAutocompleteModule
  ]
})
export class AdminModule {
}
