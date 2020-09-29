import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepperComponent} from './stepper.component';
import {StepComponent} from './step/step.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
        StepperComponent,
        StepComponent,
        HeaderComponent
    ],
    exports: [
        StepperComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class StepperModule {
}
