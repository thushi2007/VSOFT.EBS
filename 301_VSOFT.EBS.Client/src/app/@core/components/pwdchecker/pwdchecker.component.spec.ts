import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdcheckerComponent } from './pwdchecker.component';

describe('PwdcheckerComponent', () => {
  let component: PwdcheckerComponent;
  let fixture: ComponentFixture<PwdcheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwdcheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwdcheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
