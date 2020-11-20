import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EbooksComponent} from './ebooks.component';

const routes: Routes = [
  {
    path: '',
    component: EbooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EbooksRoutingModule {
}
