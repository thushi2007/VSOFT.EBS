import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckoutComponent} from './checkout.component';
import {AccountComponent} from './account/account.component';
import {FinishComponent} from './finish/finish.component';
import {ItemsComponent} from './items/items.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      {
        path: 'account',
        component: AccountComponent,
        data: {animationState: 'One'}
      },
      {
        path: 'items',
        component: ItemsComponent,
        data: {animationState: 'Two'}
      },
      {
        path: 'finish',
        component: FinishComponent,
        data: {animationState: 'Three'}
      },
      {
        path: '',
        redirectTo: 'account'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {
}
