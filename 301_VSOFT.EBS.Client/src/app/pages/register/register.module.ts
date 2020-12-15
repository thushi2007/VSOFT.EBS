import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './register.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CoreModule} from '@core/core.module';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {NgxMaskModule} from 'ngx-mask';
import {MatInputModule} from '@angular/material/input';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {RegisterFormComponent} from './register-form/register-form.component';

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterFormComponent
  ],
  exports: [
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    RegisterRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    NgxMaskModule,
    MatGoogleMapsAutocompleteModule
  ]
})
export class RegisterModule {
}
