import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsModalViewComponent } from './comments-modal-view.component';

describe('CommentsModalViewComponent', () => {
  let component: CommentsModalViewComponent;
  let fixture: ComponentFixture<CommentsModalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsModalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
