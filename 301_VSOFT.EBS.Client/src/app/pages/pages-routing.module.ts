import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [{
  path: 'anmelden',
  loadChildren: () => import(`./login/login.module`).then(m => m.LoginModule)
}, {
  path: '**',
  redirectTo: 'anmelden',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
