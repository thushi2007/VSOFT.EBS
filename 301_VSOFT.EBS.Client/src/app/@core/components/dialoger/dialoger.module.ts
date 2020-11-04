import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogerComponent} from './dialoger.component';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {PromiseButtonModule} from '@core/components';
import {DialogWindowComponent} from './dialog-window/dialog-window.component';
import {DialogerService} from '@core/components/dialoger/dialoger.service';
import {BasedialogcompComponent} from '@core/components/dialoger/inheritance/basedialogcomp/basedialogcomp.component';

@NgModule({
  declarations: [
    DialogerComponent,
    DialogWindowComponent,
    BasedialogcompComponent
  ],
  exports: [
    DialogerComponent,
    DialogWindowComponent,
    BasedialogcompComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    PromiseButtonModule
  ]
})
export class DialogerModule {
}
