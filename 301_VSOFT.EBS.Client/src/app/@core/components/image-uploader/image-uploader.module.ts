import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageUploaderComponent} from './image-uploader.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {DirectivesModule} from '@core/directives.module';
// import {ngfModule} from 'angular-file';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {PromiseButtonModule} from '@core/components/promise-button/promise-button.module';
import {ImageUploaderItemComponent} from './image-uploader-item/image-uploader-item.component';

@NgModule({
  declarations: [
    ImageUploaderComponent,
    ImageUploaderItemComponent
  ],
  exports: [
    ImageUploaderComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    DirectivesModule,
    // ngfModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    PromiseButtonModule
  ]
})
export class ImageUploaderModule {

}
