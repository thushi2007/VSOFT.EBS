import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessagerComponent} from './messager.component';
import {MessageComponent} from './message/message.component';

@NgModule({
  declarations: [
    MessagerComponent,
    MessageComponent
  ],
  exports: [
    MessagerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MessagerModule {
}
