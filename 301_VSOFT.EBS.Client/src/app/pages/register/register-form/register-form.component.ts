import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AccordionComponent, MessagerComponent, PromiseButtonComponent} from '@core/components';
import {EnumModel} from '@core/models/enummodel';
import {GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
import {ApiService} from '@core/services/api.service';
import {AuthService} from '@core/services';
import {CustomerDto} from '@core/models/customerdto';

@Component({
  selector: 'ebs-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Output() successpostAction: EventEmitter<any> = new EventEmitter();
  @ViewChild(MessagerComponent, {static: true}) msg: MessagerComponent;
  @ViewChild(AccordionComponent, {static: true}) stepper: AccordionComponent;

  issuccesspostActionUsed = false;
  registerDto: CustomerDto = new CustomerDto();

  showPwd1 = false;
  showPwd2 = false;

  updateAddress = false;

  salutationLst: EnumModel[];

  constructor(private apiService: ApiService,
              private authService: AuthService) {
  }

  async ngOnInit(): Promise<any> {
    this.salutationLst = await this.loadSalutations();
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
          this.registerDto.Firstname + ' ' + this.registerDto.Lastname).then(() => {
          this.apiService.post('/customer', this.registerDto).toPromise().then(() => {
            if (this.issuccesspostActionUsed) {
              this.successpostAction.emit();
              this.stepper.resetAllSteps();
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
