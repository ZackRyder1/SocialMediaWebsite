import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LFFModalViewComponent } from './lffmodal-view.component';

describe('LFFModalViewComponent', () => {
  let component: LFFModalViewComponent;
  let fixture: ComponentFixture<LFFModalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LFFModalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LFFModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
