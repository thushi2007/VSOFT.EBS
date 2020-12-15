import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {AuthService} from '@core/services';

@Component({
  selector: 'ebs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked {

  constructor(private oauthService: OAuthService,
              private authService: AuthService,
              private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  isUserLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  isAdmin(): boolean {
    return this.authService.isUserAdmin();
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }
}
