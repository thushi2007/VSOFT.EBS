import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomerDto} from '@core/models/customerdto';
import {GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
import {EnumModel} from '@core/models/enummodel';
import {ApiService} from '@core/services/api.service';
import {AuthService} from '@core/services';
import {MessagerComponent, PromiseButtonComponent} from '@core/components';

@Component({
  selector: 'ebs-kunde-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class KundeProfileComponent implements OnInit {
  @ViewChild(MessagerComponent, {static: false}) msg: MessagerComponent;
  @ViewChild('updateBtn', {static: false}) updateBtn: PromiseButtonComponent;

  paths: any;

  profile: CustomerDto = new CustomerDto();
  salutationLst: EnumModel[];

  updateAddress = false;

  constructor(private apiService: ApiService,
              private authService: AuthService) {
    this.paths = {
      Title: 'Benutzerkonto - Profil',
      Paths: [{
        Url: '/benutzerkonto/admin',
        Text: 'Benutzerkonto'
      }, {
        Url: '/benutzerkonto/admin/profile',
        Text: 'Profil'
      }]
    };
  }

  async ngOnInit(): Promise<any> {
    this.salutationLst = await this.loadSalutations();

    const userName = this.authService.getUsername();
    this.profile = await this.apiService.get(`/customer/user/${userName}`).toPromise();
  }

  async loadSalutations(): Promise<any> {
    return this.apiService.get('/enum/salutations').toPromise();
  }

  onGermanAddressMapped($event: GermanAddress): void {
    this.profile.Street = $event.streetName;
    this.profile.StreetNo = $event.streetNumber;
    this.profile.Zip = $event.postalCode + '';
    this.profile.Location = $event.vicinity;

    this.updateAddress = true;
  }

  updateProfile(): void {
    this.updateBtn.promiseFunction = new Promise<any>(async (resolve, reject) => {
      this.profile = await this.apiService.put('/customer', this.profile).toPromise();
      this.msg.popSuccessMessage('Erfolgreich gespeichert', 'Ihr Benutzerprofil wurde erfolgreich gespeichert.');
      resolve();
    });
  }
}
