import {Component, OnInit, ViewChild} from '@angular/core';
import {MessagerComponent} from '@core/components/messager/messager.component';
import {FormValidationDirective} from '@core/directives/form-validation.directive';
import {PromiseButtonComponent} from '@core/components/promise-button/promise-button.component';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import {AuthService} from '@core/services';

@Component({
  selector: 'ebs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(MessagerComponent, {static: false}) msg: MessagerComponent;
  @ViewChild(FormValidationDirective, {static: false}) loginForm: FormValidationDirective;
  @ViewChild('loginBtn', {static: false}) loginBtn: PromiseButtonComponent;

  paths: any;
  showPwd1 = false;

  loginDto = {
    username: '',
    pwd: '',
    staylogged: false
  };

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

    this.titleService.setTitle('Anmelden | immosketch.ch');
    // this.metaService.addTags(AppConfig.metadata);
    this.metaService.updateTag({name: 'description', content: 'Melden Sie sich an, um zu Ihr Benutzerkonto zu gelangen.'});
  }

  reset(): void {
    this.loginForm.resetForm();
    this.msg.hide();
  }

  loginUser(): void {
    this.loginForm.isValid.then(async (valid) => {
      if (valid) {
        this.oauthService
          .fetchTokenUsingPasswordFlowAndLoadUserProfile(this.loginDto.username, this.loginDto.pwd).then(() => {
          if (this.authService.isUserAdmin()) {
            this.router.navigateByUrl('/benutzerkonto/admin');
          } else if (!this.authService.isUserAdmin()) {
            this.router.navigateByUrl('/benutzerkonto/kunde');
          }
        });
      } else {
        this.oauthService.logOut();
        this.msg.hide();
        this.msg.popErrorMessage('Fehler!', 'Bitte füllen Sie alle nötigen Fehler aus.');
      }
    });
  }

  ngOnInit(): void {
    this.oauthService.logOut();
  }
}
