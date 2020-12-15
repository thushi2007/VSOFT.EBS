// core modules
import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// own modules
import {
  AccordionModule,
  ImageSliderModule,
  ImageUploaderModule,
  MessagerModule,
  PageHeaderModule,
  PromiseButtonModule,
  PwdcheckerModule,
  StepperModule,
  SubmenuModule,
  TotopModule
} from '@core/components';

import {DialogerModule} from '@core/components/dialoger/dialoger.module';

// own directives
import {
  DndDirective,
  EnumSelectionDirective,
  FormValidationDirective,
  InputMatchValidationDirective,
  InputNotNullIfDirective,
  InputValidationDirective,
  InputValidationIfDirective,
  MenueSelectedDirective,
  OnlyNumberDirective,
  ScrollonDirective,
  UserExistValidationDirective,
  UserNotExistValidationDirective
} from '@core/directives';

// own services
import {AuthService, CartService, DialogerService, MenuService, StorageService} from '@core/services';

// guards
import {AuthGuardService} from '@core/guards/auth-guard.service';

@NgModule({
  declarations: [
    // own directives
    EnumSelectionDirective,
    FormValidationDirective,
    InputMatchValidationDirective,
    InputNotNullIfDirective,
    InputValidationDirective,
    InputValidationIfDirective,
    MenueSelectedDirective,
    ScrollonDirective,
    UserExistValidationDirective,
    UserNotExistValidationDirective,
    OnlyNumberDirective,
    DndDirective
  ],
  imports: [
    // own modules
    CommonModule,
    TotopModule,
    PromiseButtonModule,
    SubmenuModule,
    PageHeaderModule,
    MessagerModule,
    DialogerModule,
    ImageSliderModule,
    PwdcheckerModule,
    StepperModule,
    AccordionModule,
    ImageUploaderModule
  ],
  exports: [
    // own modules
    TotopModule,
    PromiseButtonModule,
    SubmenuModule,
    PageHeaderModule,
    MessagerModule,
    DialogerModule,
    ImageSliderModule,
    PwdcheckerModule,
    StepperModule,
    AccordionModule,
    ImageUploaderModule,
    // own directives
    EnumSelectionDirective,
    FormValidationDirective,
    InputMatchValidationDirective,
    InputNotNullIfDirective,
    InputValidationDirective,
    InputValidationIfDirective,
    MenueSelectedDirective,
    ScrollonDirective,
    UserExistValidationDirective,
    UserNotExistValidationDirective,
    OnlyNumberDirective,
    DndDirective
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: CoreModule,
      providers: [
        StorageService,
        AuthGuardService,
        DialogerService,
        AuthService,
        MenuService,
        CartService
      ]
    };
  }
}
