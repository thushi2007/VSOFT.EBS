import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSlideSubTitleComponent } from './img-slide-sub-title.component';

describe('ImgSlideSubTitleComponent', () => {
  let component: ImgSlideSubTitleComponent;
  let fixture: ComponentFixture<ImgSlideSubTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgSlideSubTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgSlideSubTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
