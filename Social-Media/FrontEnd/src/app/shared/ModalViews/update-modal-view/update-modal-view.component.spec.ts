import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModalViewComponent } from './update-modal-view.component';

describe('UpdateModalViewComponent', () => {
  let component: UpdateModalViewComponent;
  let fixture: ComponentFixture<UpdateModalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateModalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
