import {Component, OnInit, EventEmitter, Output, ViewChild} from '@angular/core';
import {EnumModel} from '@core/models/enummodel';
import {ApiService} from '@core/services/api.service';
import {AuthService} from '@core/services';
import {MessagerComponent, PromiseButtonComponent} from '@core/components';
import {GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';

@Component({
  selector: 'ebs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() successpostAction: EventEmitter<any> = new EventEmitter();
  @ViewChild(MessagerComponent, {static: true}) msg: MessagerComponent;

  private issuccesspostActionUsed = false;

  registerDto = {
    AnredeId: '',

    Organisation: '',
    Firstname: '',
    Lastname: '',

    Street: '',
    StreetNo: '',
    Zip: '',
    Location: '',

    Phone: '',
    Mobile: '',
    EMail: '',
    Web: '',

    Pwd: '',
    PwdRepeat: '',

    ActivationCode: ''
  };

  showPwd1 = false;
  showPwd2 = false;

  updateAddress = false;

  salutationLst: EnumModel[];

  constructor(private apiService: ApiService,
              private authService: AuthService) {
  }

  async ngOnInit(): Promise<any> {
    this.salutationLst = await this.loadSalutations();
    console.log(this.salutationLst);
    this.issuccesspostActionUsed = this.successpostAction.observers.length > 0;
  }

  onGermanAddressMapped($event: GermanAddress): void {
    this.registerDto.Street = $event.streetName;
    this.registerDto.StreetNo = $event.streetNumber;
    this.registerDto.Zip = $event.postalCode + '';
    this.registerDto.Location = $event.vicinity;

    this.updateAddress = true;
  }

  async loadSalutations(): Promise<any> {
    return this.apiService.get('/enum/salutations').toPromise();
  }

  registerAccount(promiseBtn: PromiseButtonComponent): void {
    if (promiseBtn) {
      promiseBtn.promiseFunction = new Promise<any>((resolve, reject) => {
        this.authService.registerUserIdp(this.registerDto.EMail, this.registerDto.Pwd,
          this.registerDto.Firstname + ' ' + this.registerDto.Lastname).then((activationCode: string) => {
          this.registerDto.ActivationCode = activationCode;
          this.apiService.post('/register/person', this.registerDto).toPromise().then((msg) => {
            if (this.issuccesspostActionUsed) {
              this.successpostAction.emit({prombtn: promiseBtn, email: this.registerDto.EMail});
            }
            resolve();
          }, error => {
            this.msg.popErrorMessage('Fehler!', error.message);
            reject();
          });
        }, error => {
          this.msg.popErrorMessage('Fehler!', error.message);
          reject();
        });
      });
    }
  }
}
