import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromiseButtonComponent } from './promise-button.component';

describe('PromiseButtonComponent', () => {
  let component: PromiseButtonComponent;
  let fixture: ComponentFixture<PromiseButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromiseButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromiseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
