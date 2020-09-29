import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromiseButtonIconComponent } from './promise-button-icon.component';

describe('PromiseButtonIconComponent', () => {
  let component: PromiseButtonIconComponent;
  let fixture: ComponentFixture<PromiseButtonIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromiseButtonIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromiseButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
