import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// own components
import {PwdcheckerComponent} from './pwdchecker.component';
import {MatPasswordStrengthModule} from '@angular-material-extensions/password-strength';

@NgModule({
  declarations: [
    PwdcheckerComponent
  ],
  imports: [
    CommonModule,
    MatPasswordStrengthModule
  ],
  exports: [
    PwdcheckerComponent
  ]
})
export class PwdcheckerModule {
}
