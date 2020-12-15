import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {PagesModule} from './pages/pages.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OAuthModule, OAuthStorage} from 'angular-oauth2-oidc';
import {NgxMaskModule} from 'ngx-mask';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {HttpClientModule} from '@angular/common/http';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FooterModule} from './footer/footer.module';
import {HeaderModule} from './header/header.module';
import {CoreModule} from '@core/core.module';
import {NgImageSliderModule} from 'ng-image-slider';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export function storageFactory(): OAuthStorage {
  return localStorage;
}

export function getLocalStorage(): any {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    HeaderModule,
    FooterModule,
    PagesModule,
    CoreModule.forRoot(),
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDe4ycHAmYcqUu3wfXzL1rnHwPvVDr8fIY',
      region: 'CH',
      libraries: ['places']
    }),
    AgmDirectionModule,
    MatGoogleMapsAutocompleteModule,
    NgxMaskModule.forRoot({validation: false}),
    SweetAlert2Module.forRoot(),
    MatMomentDateModule,
    NgImageSliderModule
  ],
  providers: [
    {
      provide: OAuthStorage,
      useFactory: storageFactory
    },
    {
      provide: 'LOCALSTORAGE',
      useFactory: getLocalStorage
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-CH'
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    },
    {
      provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS,
      useValue: {useUtc: true}
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
