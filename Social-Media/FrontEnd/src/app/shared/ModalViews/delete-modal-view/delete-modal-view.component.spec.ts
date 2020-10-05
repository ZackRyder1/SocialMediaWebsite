import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalViewComponent } from './delete-modal-view.component';

describe('DeleteModalViewComponent', () => {
  let component: DeleteModalViewComponent;
  let fixture: ComponentFixture<DeleteModalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteModalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
