import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// own components
import { TotopComponent } from './totop.component';

// own services
import {ScrolltotopService} from './services/scrolltotop.service';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [TotopComponent],
    imports: [
        CommonModule,
        MatButtonModule
    ],
  exports: [
    TotopComponent
  ],
  providers: [
    ScrolltotopService
  ]
})
export class TotopModule { }
