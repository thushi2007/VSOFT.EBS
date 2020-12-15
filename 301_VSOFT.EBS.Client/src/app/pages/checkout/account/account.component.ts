import {Component, OnInit} from '@angular/core';
import {StepComponent} from '@core/components/stepper/step/step.component';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {CustomerDto} from '@core/models/customerdto';
import {ApiService} from '@core/services/api.service';
import {AuthService, CartService} from '@core/services';

@Component({
  selector: 'ebs-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends StepComponent implements OnInit {
  stepPreviousUrl = '';
  stepNextUrl = 'checkout/items';

  mustBeAuthenticated = false;
  user: CustomerDto;
  showUser = false;

  constructor(public oauthService: OAuthService,
              private authService: AuthService,
              private apiService: ApiService,
              private cartService: CartService,
              public router: Router) {
    super(oauthService, router);

    if (this.cartService.items.length === 0) {
      this.router.navigateByUrl('cart');
    }

    this.showUser = this.oauthService.hasValidAccessToken();
  }

  afterLogin(): void {
    this.router.navigateByUrl('/checkout/items').then(() => {
      this.showUser = this.oauthService.hasValidAccessToken();
    });
  }

  async ngOnInit(): Promise<any> {
    super.ngOnInit();

    if (this.oauthService.hasValidAccessToken()) {
      const username = this.authService.getUsername();
      this.user = await this.apiService.get(`/customer/user/${username}`).toPromise();
    }
  }
}
