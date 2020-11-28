import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

// own components
import {ImageSliderComponent} from './image-slider.component';
import {ImgSlideComponent} from './img-slide/img-slide.component';
import {ImgSlideNextComponent} from './img-slide-next/img-slide-next.component';
import {ImgSlidePrevComponent} from './img-slide-prev/img-slide-prev.component';
import {ImgSlideTitleComponent} from './img-slide-title/img-slide-title.component';
import {ImgSlideSubTitleComponent} from './img-slide-sub-title/img-slide-sub-title.component';
import {ImageSliderService} from '@core/components/image-slider/services/image-slider.service';

@NgModule({
  declarations: [
    ImageSliderComponent,
    ImgSlideComponent,
    ImgSlideNextComponent,
    ImgSlidePrevComponent,
    ImgSlideTitleComponent,
    ImgSlideSubTitleComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ImgSlideComponent,
    ImgSlideTitleComponent,
    ImageSliderComponent,
    ImgSlideSubTitleComponent
  ]
})
export class ImageSliderModule {
}
