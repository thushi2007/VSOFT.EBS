import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasedialogcompComponent } from './basedialogcomp.component';

describe('BasedialogcompComponent', () => {
  let component: BasedialogcompComponent;
  let fixture: ComponentFixture<BasedialogcompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasedialogcompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasedialogcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
