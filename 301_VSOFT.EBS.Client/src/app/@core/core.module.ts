// core modules
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// own modules
import {TotopModule} from './components/totop/totop.module';
import {PromiseButtonModule} from './components/promise-button/promise-button.module';
import {SubmenuModule} from './components/submenu/submenu.module';
import {PageHeaderModule} from './components/page-header/page-header.module';
import {MessagerModule} from './components/messager/messager.module';
import {DialogerModule} from './components/dialoger/dialoger.module';
import {PwdcheckerModule} from './components/pwdchecker/pwdchecker.module';
import {StepperModule} from './components/stepper/stepper.module';
import {AccordionModule} from './components/accordion/accordion.module';
import {NumberSpinnerModule} from './components/number-spinner/number-spinner.module';
import {ImageUploaderModule} from '@core/components/image-uploader/image-uploader.module';

// own services
import {StorageService} from './services/storage.service';
import {MenuService} from './services/menu.service';
import {AuthService} from './services/auth.service';
import {ApiService} from './services/api.service';

// guards
import {AuthGuardService} from './guards/auth-guard.service';
import {DirectivesModule} from '@core/directives.module';


@NgModule({
  declarations: [
    // own directives

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
    PwdcheckerModule,
    StepperModule,
    AccordionModule,
    NumberSpinnerModule,
    ImageUploaderModule
  ],
  exports: [
    // own modules
    DirectivesModule,
    TotopModule,
    PromiseButtonModule,
    SubmenuModule,
    PageHeaderModule,
    MessagerModule,
    DialogerModule,
    PwdcheckerModule,
    StepperModule,
    AccordionModule,
    NumberSpinnerModule,
    ImageUploaderModule
  ],
  providers: [
    StorageService,
    ApiService,
    AuthGuardService,
    AuthService,
    MenuService
  ]
})
export class CoreModule {
}
