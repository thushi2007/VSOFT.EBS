import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccordionComponent} from './accordion.component';
import {AccordionItemComponent} from './accordion-item/accordion-item.component';
import {MessagerModule} from '@core/components/messager/messager.module';
import {PromiseButtonModule} from '@core/components/promise-button/promise-button.module';

@NgModule({
  declarations: [
    AccordionComponent,
    AccordionItemComponent
  ],
  exports: [
    AccordionComponent,
    AccordionItemComponent
  ],
  imports: [
    CommonModule,
    MessagerModule,
    PromiseButtonModule
  ]
})
export class AccordionModule {
}
