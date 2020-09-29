import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PromiseButtonComponent} from './promise-button.component';
import {PromiseButtonIconComponent} from './promise-button-icon/promise-button-icon.component';
import {PromiseButtonSpinnerComponent} from './promise-button-spinner/promise-button-spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons';

@NgModule({
  declarations: [
    PromiseButtonComponent,
    PromiseButtonIconComponent,
    PromiseButtonSpinnerComponent
  ],
  exports: [
    PromiseButtonComponent,
    PromiseButtonIconComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    Angular2PromiseButtonModule.forRoot()
  ]
})
export class PromiseButtonModule {
}
