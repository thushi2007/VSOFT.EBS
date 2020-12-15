import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from './cart.component';
import {CoreModule} from '@core/core.module';
import {ItemsComponent} from './items/items.component';

@NgModule({
  declarations: [
    CartComponent,
    ItemsComponent
  ],
  exports: [
    CartComponent,
    ItemsComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    CoreModule
  ]
})
export class CartModule {
}
