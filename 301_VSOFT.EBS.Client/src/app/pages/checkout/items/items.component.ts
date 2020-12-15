import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {StepComponent} from '@core/components/stepper/step/step.component';
import {OAuthService} from 'angular-oauth2-oidc';
import {Router} from '@angular/router';
import {BuyDto} from '@core/models/buydto';
import {AuthService, CartService} from '@core/services';
import {ApiService} from '@core/services/api.service';
import {PromiseButtonComponent} from '@core/components';

@Component({
  selector: 'ebs-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent extends StepComponent implements AfterViewInit {
  @ViewChild('finishBtn', {static: true}) btnPromise: PromiseButtonComponent;

  stepPreviousUrl = 'checkout/account';
  stepNextUrl = 'checkout/finish';

  mustBeAuthenticated = true;

  constructor(public oauthService: OAuthService,
              private authService: AuthService,
              private cartService: CartService,
              private apiService: ApiService,
              public router: Router) {
    super(oauthService, router);

    if (this.cartService.items.length === 0) {
      this.router.navigateByUrl('cart');
    }
  }

  async createBuy(): Promise<any> {
    this.btnPromise.promiseFunction = new Promise(async (resolve) => {
      const buyDto = new BuyDto();
      buyDto.CustomerUsername = this.authService.getUsername();
      buyDto.TotalPrice = this.cartService.totalAmount;
      buyDto.ArticleIds = [];
      this.cartService.items.forEach((itm) => {
        buyDto.ArticleIds.push(itm.Id);
      });
      await this.apiService.post(`/buy`, buyDto).toPromise();
      resolve();
    }).then(() => {
      this.nextStep();
    });
  }

  cangoNext(): boolean {
    return this.cartService.items.length !== 0;
  }
}
