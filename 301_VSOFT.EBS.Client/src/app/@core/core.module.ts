// core modules
import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// own modules
import {
  TotopModule,
  PromiseButtonModule,
  SubmenuModule,
  PageHeaderModule,
  MessagerModule,
  ImageSliderModule,
  PwdcheckerModule,
  StepperModule,
  AccordionModule,
  NumberSpinnerModule,
  ImageUploaderModule
} from '@core/components';

import {DialogerModule} from '@core/components/dialoger/dialoger.module';

// own directives
import {
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
} from '@core/directives';

// own services
import {
  StorageService,
  MenuService,
  AuthService,
  DialogerService
} from '@core/services';

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
    NumberSpinnerModule,
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
    NumberSpinnerModule,
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
      ]
    };
  }
}
