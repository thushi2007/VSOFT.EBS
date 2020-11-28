import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSlideTitleComponent } from './img-slide-title.component';

describe('ImgSlideTitleComponent', () => {
  let component: ImgSlideTitleComponent;
  let fixture: ComponentFixture<ImgSlideTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgSlideTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgSlideTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
