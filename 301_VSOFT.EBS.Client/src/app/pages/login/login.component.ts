import {Component, OnInit, ViewChild} from '@angular/core';
import {MessagerComponent} from '@core/components/messager/messager.component';
import {FormValidationDirective} from '@core/directives/form-validation.directive';
import {PromiseButtonComponent} from '@core/components/promise-button/promise-button.component';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'ebs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(MessagerComponent, {static: false}) msg: MessagerComponent;
  @ViewChild(FormValidationDirective, {static: false}) loginForm: FormValidationDirective;
  @ViewChild('loginBtn', {static: false}) loginBtn: PromiseButtonComponent;

  showPwd1 = false;

  loginDto = {
    username: '',
    pwd: '',
    staylogged: false
  };

  constructor(private titleService: Title,
              private router: Router,
              private oauthService: OAuthService) {
  }

  reset(): void {
    this.loginForm.resetForm();
    this.msg.hide();
  }

  loginUser(): void {
    this.loginForm.isValid.then((valid) => {
      if (valid) {
        this.loginBtn.promiseFunction = this.oauthService
          .fetchTokenUsingPasswordFlow(this.loginDto.username, this.loginDto.pwd).then(() => {
            console.log(this.oauthService.getAccessToken());
            this.router.navigateByUrl('/benutzerkonto');
          });
      } else {
        this.oauthService.logOut();
        this.msg.hide();
        this.msg.popErrorMessage('Fehler!', 'Bitte füllen Sie alle nötigen Fehler aus.');
      }
    });
  }

  ngOnInit(): void {
  }

}
