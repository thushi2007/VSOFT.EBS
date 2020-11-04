import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSlideNextComponent } from './img-slide-next.component';

describe('ImgSlideNextComponent', () => {
  let component: ImgSlideNextComponent;
  let fixture: ComponentFixture<ImgSlideNextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgSlideNextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgSlideNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
