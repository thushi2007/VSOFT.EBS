import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSlidePrevComponent } from './img-slide-prev.component';

describe('ImgSlidePrevComponent', () => {
  let component: ImgSlidePrevComponent;
  let fixture: ComponentFixture<ImgSlidePrevComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgSlidePrevComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgSlidePrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
