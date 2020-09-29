import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromiseButtonSpinnerComponent } from './promise-button-spinner.component';

describe('PromiseButtonSpinnerComponent', () => {
  let component: PromiseButtonSpinnerComponent;
  let fixture: ComponentFixture<PromiseButtonSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromiseButtonSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromiseButtonSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
