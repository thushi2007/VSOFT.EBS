import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogerComponent} from './dialoger.component';
import {DialogComponent} from './dialog/dialog.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    DialogerComponent,
    DialogComponent
  ],
  exports: [
    DialogerComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class DialogerModule {
}
