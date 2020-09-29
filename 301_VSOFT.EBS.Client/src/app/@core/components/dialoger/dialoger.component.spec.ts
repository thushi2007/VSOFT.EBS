import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogerComponent } from './dialoger.component';

describe('DialogerComponent', () => {
  let component: DialogerComponent;
  let fixture: ComponentFixture<DialogerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
