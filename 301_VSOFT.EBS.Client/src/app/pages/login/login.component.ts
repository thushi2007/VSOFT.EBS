import {Component, OnInit, ViewChild} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {AuthService} from '@core/services';
import {MessagerComponent} from '@core/components';

@Component({
  selector: 'ebs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(MessagerComponent, {static: true}) msg: MessagerComponent;

  paths: any;

  newUserCreated = false;

  constructor(private titleService: Title,
              private metaService: Meta,
              private router: Router,
              private authService: AuthService,
              private oauthService: OAuthService) {
    this.paths = {
      Title: 'Anmelden',
      Paths: [{
        Url: '/anmelden',
        Text: 'Anmelden'
      }]
    };

    this.titleService.setTitle('Anmelden');
    this.metaService.updateTag({name: 'description', content: 'Registration'});

    this.newUserCreated = this.router.getCurrentNavigation()?.extras?.state?.userCreated;
  }

  ngOnInit(): void {
    this.oauthService.logOut();

    if (this.newUserCreated) {
      this.msg.popSuccessMessage('Registration erfolgreich', 'Sie wurden erfolgreich registriert. Sie können sich direkt anmelden.');
    }
  }

  redirectArterLogin(): void {
    if (this.authService.isUserAdmin()) {
      this.router.navigateByUrl('/benutzerkonto/admin');
    } else if (!this.authService.isUserAdmin()) {
      this.router.navigateByUrl('/benutzerkonto/kunde');
    }
  }
}
