import {Component} from '@angular/core';
import {environment} from '../environments/environment';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'ebs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ebs';

  public constructor(private oauthService: OAuthService) {
    this.oauthService.issuer = environment.idpUrl;
    this.oauthService.tokenEndpoint = environment.idpUrl + '/connect/token';
    this.oauthService.userinfoEndpoint = environment.idpUrl + '/connect/userinfo';
    this.oauthService.clientId = environment.idpUser;
    this.oauthService.scope = environment.apiScope;
    this.oauthService.responseType = 'id_token token';
    this.oauthService.oidc = false;
    this.oauthService.requireHttps = false;
    this.oauthService.clearHashAfterLogin = true;
    this.oauthService.dummyClientSecret = environment.idpPwd;
  }
}
