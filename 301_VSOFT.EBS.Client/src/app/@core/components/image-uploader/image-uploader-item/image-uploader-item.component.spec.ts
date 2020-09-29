import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploaderItemComponent } from './image-uploader-item.component';

describe('ImageUploaderItemComponent', () => {
  let component: ImageUploaderItemComponent;
  let fixture: ComponentFixture<ImageUploaderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploaderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploaderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
