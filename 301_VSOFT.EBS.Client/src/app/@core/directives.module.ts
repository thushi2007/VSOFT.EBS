import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnumSelectionDirective} from './directives/enum-selection.directive';
import {FormValidationDirective} from './directives/form-validation.directive';
import {InputMatchValidationDirective} from './directives/input-match-validation.directive';
import {InputNotNullIfDirective} from './directives/input-not-null-if.directive';
import {InputValidationDirective} from './directives/input-validation.directive';
import {InputValidationIfDirective} from './directives/input-validation-if.directive';
import {MenueSelectedDirective} from './directives/menue-selected.directive';
import {ScrollonDirective} from './directives/scrollon.directive';
import {UserExistValidationDirective} from './directives/user-exist-validation.directive';
import {UserNotExistValidationDirective} from './directives/user-not-exist-validation.directive';
import {OnlyNumberDirective} from './directives/only-number.directive';
import {DndDirective} from '@core/directives/dnd.directive';

@NgModule({
  declarations: [
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
  exports: [
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
    CommonModule
  ]
})
export class DirectivesModule {
}
