import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {KundeBuysComponent} from './buys/buys.component';
import {KundeProfileComponent} from './profile/profile.component';
import {CoreModule} from '@core/core.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {KundeDetailsComponent} from './buys/details/details.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    UserComponent,
    KundeProfileComponent,
    KundeBuysComponent,
    KundeDetailsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoreModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatGoogleMapsAutocompleteModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatButtonModule
  ]
})
export class UserModule {
}
