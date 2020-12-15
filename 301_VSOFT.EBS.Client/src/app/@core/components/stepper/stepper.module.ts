import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepperComponent} from './stepper.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import { StepComponent } from './step/step.component';

@NgModule({
  declarations: [
    StepperComponent,
    HeaderComponent,
    StepComponent
  ],
  exports: [
    StepperComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class StepperModule {
}
