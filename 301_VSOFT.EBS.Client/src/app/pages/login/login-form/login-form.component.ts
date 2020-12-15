import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MessagerComponent, PromiseButtonComponent} from '@core/components';
import {FormValidationDirective} from '@core/directives';
import {Router} from '@angular/router';
import {AuthService} from '@core/services';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'ebs-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() successpostAction: EventEmitter<any> = new EventEmitter();

  @ViewChild(MessagerComponent, {static: false}) msg: MessagerComponent;
  @ViewChild(FormValidationDirective, {static: false}) loginForm: FormValidationDirective;
  @ViewChild('loginBtn', {static: false}) loginBtn: PromiseButtonComponent;

  issuccesspostActionUsed = false;

  showPwd1 = false;

  loginDto = {
    username: '',
    pwd: '',
    staylogged: false
  };

  constructor(private router: Router,
              private authService: AuthService,
              private oauthService: OAuthService) {
  }


  async ngOnInit(): Promise<any> {
    this.issuccesspostActionUsed = this.successpostAction.observers.length > 0;
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
          if (this.issuccesspostActionUsed) {
            this.successpostAction.emit();
          }
        });
      } else {
        this.oauthService.logOut();
        this.msg.hide();
        this.msg.popErrorMessage('Fehler!', 'Bitte füllen Sie alle nötigen Fehler aus.');
      }
    });
  }
}
