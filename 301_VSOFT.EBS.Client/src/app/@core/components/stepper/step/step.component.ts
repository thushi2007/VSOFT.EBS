import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormValidationDirective} from '@core/directives';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';

@Component({
  selector: 'ebs-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit, AfterViewInit {
  @ViewChild(FormValidationDirective, {static: false}) stepForm: FormValidationDirective;

  stepPreviousUrl: string;
  stepNextUrl: string;

  mustBeAuthenticated: boolean;

  constructor(public oauthService: OAuthService,
              public router: Router) {
  }

  ngOnInit(): void {
  }

  cangoNext(): boolean {
    return true;
  }

  nextStep(): void {
    if (!this.stepForm) {
      this.router.navigateByUrl(this.stepNextUrl);
    } else {
      this.stepForm.isValid.then((valid: boolean) => {
        if (!valid) {
          this.previousStep();
        } else {
          this.router.navigateByUrl(this.stepNextUrl);
        }
      });
    }
  }

  previousStep(): void {
    this.router.navigateByUrl(this.stepPreviousUrl);
  }

  ngAfterViewInit(): void {
    if (this.cangoNext()) {
      if (this.mustBeAuthenticated && !this.oauthService.hasValidAccessToken()) {
        setTimeout(() => {
          this.previousStep();
        }, 300);
      }
    }
  }
}

