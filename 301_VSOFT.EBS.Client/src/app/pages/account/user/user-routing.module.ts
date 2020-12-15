import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {KundeProfileComponent} from '../user/profile/profile.component';
import {KundeBuysComponent} from '../user/buys/buys.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'kaeufe',
        component: KundeBuysComponent,
      },
      {
        path: 'profile',
        component: KundeProfileComponent
      },
      {
        path: '',
        redirectTo: 'kaeufe',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
