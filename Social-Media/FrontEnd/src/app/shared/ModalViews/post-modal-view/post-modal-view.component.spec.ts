import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostModalViewComponent } from './post-modal-view.component';

describe('PostModalViewComponent', () => {
  let component: PostModalViewComponent;
  let fixture: ComponentFixture<PostModalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostModalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
