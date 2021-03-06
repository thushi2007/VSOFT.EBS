import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {SalutationsComponent} from './salutations/salutations.component';
import {LanguagesComponent} from './languages/languages.component';
import {CategoriesComponent} from './categories/categories.component';
import {SubcategoriesComponent} from './subcategories/subcategories.component';
import {ArticlesComponent} from './articles/articles.component';
import {BuysComponent} from './buys/buys.component';
import {CustomersComponent} from './customers/customers.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'anreden',
        component: SalutationsComponent,
      },
      {
        path: 'sprachen',
        component: LanguagesComponent,
      },
      {
        path: 'kategorien',
        component: CategoriesComponent,
      },
      {
        path: 'subkategorien',
        component: SubcategoriesComponent,
      },
      {
        path: 'artikel',
        component: ArticlesComponent,
      },
      {
        path: 'kaeufe',
        component: BuysComponent,
      },
      {
        path: 'kunden',
        component: CustomersComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        redirectTo: 'artikel',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
