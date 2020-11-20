import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccountComponent} from './account.component';
import {AuthGuardService} from '@core/guards/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: AccountComponent,
  children: [
    {
      path: 'kunde',
      loadChildren: () => import(`./user/user.module`).then(m => m.UserModule),
      canLoad: [AuthGuardService],
      data: {
        roles: [
          'Benutzer'
        ]
      }
    },
    {
      path: 'admin',
      loadChildren: () => import(`./admin/admin.module`).then(m => m.AdminModule),
      data: {
        roles: [
          'Admin'
        ]
      }
    },
    {
      path: '',
      redirectTo: 'kunde',
      pathMatch: 'full'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
