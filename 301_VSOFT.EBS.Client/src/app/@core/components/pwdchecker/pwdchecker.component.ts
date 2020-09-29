import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgModel} from '@angular/forms';
import {MatPasswordStrengthComponent} from '@angular-material-extensions/password-strength';

@Component({
  selector: 'ebs-pwdchecker',
  templateUrl: './pwdchecker.component.html',
  styleUrls: ['./pwdchecker.component.scss']
})
export class PwdcheckerComponent implements OnInit {
  @Input() pwdControl: NgModel;
  @ViewChild('passwordValidation', {static: true}) strength: MatPasswordStrengthComponent;

  pwdOK: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.pwdControl.valueChanges.subscribe((val) => {
      this.strength.passwordFormControl.setValue(val);
      this.pwdOK = this.strength.passwordFormControl.valid;
    });
  }
}
