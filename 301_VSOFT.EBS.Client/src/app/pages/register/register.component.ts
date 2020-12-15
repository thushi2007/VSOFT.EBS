import {Component, OnInit, ViewChild} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {MessagerComponent} from '@core/components';
import {Router} from '@angular/router';

@Component({
  selector: 'ebs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild(MessagerComponent, {static: true}) msg: MessagerComponent;

  paths: any;

  constructor(private titleService: Title,
              private metaService: Meta,
              private router: Router) {
    this.paths = {
      Title: 'Registrieren',
      Paths: [{
        Url: '/registrieren',
        Text: 'Registrieren'
      }]
    };

    this.titleService.setTitle('Registrieren');
    this.metaService.updateTag({name: 'description', content: 'Melden Sie sich an, um zu Ihr Benutzerkonto zu gelangen.'});
  }

  redirectAfterRedirection(): void {
    setTimeout(() => {
      this.router.navigateByUrl('/anmelden', { state: { userCreated: true } });
    }, 500);
  }
}
