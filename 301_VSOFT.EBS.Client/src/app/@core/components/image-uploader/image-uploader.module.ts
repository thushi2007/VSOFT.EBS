import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageUploaderComponent} from './image-uploader.component';

import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {PromiseButtonModule} from '@core/components/promise-button/promise-button.module';
import {ImageUploaderItemComponent} from './image-uploader-item/image-uploader-item.component';
import {DragdropfileDirective} from './directives/dragdropfile.directive';
import {LightboxModule} from 'ngx-lightbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    DragdropfileDirective,
    ImageUploaderComponent,
    ImageUploaderItemComponent,
    DragdropfileDirective
  ],
  exports: [
    ImageUploaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    PromiseButtonModule,
    LightboxModule,
    MatProgressBarModule,
    // ngfModule
  ]
})
export class ImageUploaderModule {

}
