import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CheckoutRoutingModule} from './checkout-routing.module';
import {CheckoutComponent} from './checkout.component';
import {AccountComponent} from './account/account.component';
import {CoreModule} from '@core/core.module';
import {ItemsComponent} from './items/items.component';
import {FinishComponent} from './finish/finish.component';
import {LoginModule} from '../login/login.module';
import {RegisterModule} from '../register/register.module';
import {CartModule} from '../cart/cart.module';

@NgModule({
  declarations: [
    CheckoutComponent,
    AccountComponent,
    ItemsComponent,
    FinishComponent
  ],
  exports: [
    ItemsComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    CoreModule,
    LoginModule,
    RegisterModule,
    CartModule
  ]
})
export class CheckoutModule {
}
