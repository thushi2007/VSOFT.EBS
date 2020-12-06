import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'anmelden',
    loadChildren: () => import(`./login/login.module`).then(m => m.LoginModule)
  },
  {
    path: 'registrieren',
    loadChildren: () => import(`./register/register.module`).then(m => m.RegisterModule)
  },
  {
    path: 'benutzerkonto',
    loadChildren: () => import(`./account/account.module`).then(m => m.AccountModule)
  },
  {
    path: 'ebooks',
    loadChildren: () => import(`./ebooks/ebooks.module`).then(m => m.EbooksModule)
  },
  {
    path: '**',
    redirectTo: 'anmelden',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
        initialNavigation: 'enabled'
      }
    )],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
