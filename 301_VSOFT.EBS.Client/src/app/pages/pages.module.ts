import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {CoreModule} from '@core/core.module';
import {LoginModule} from './login/login.module';

@NgModule({
  declarations: [
    PagesComponent
  ],
  exports: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    LoginModule,
    CoreModule
  ]
})
export class PagesModule {
}
