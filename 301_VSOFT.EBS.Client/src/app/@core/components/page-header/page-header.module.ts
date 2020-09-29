import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageHeaderComponent} from './page-header.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    PageHeaderComponent
  ],
  exports: [
    PageHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PageHeaderModule {
}
