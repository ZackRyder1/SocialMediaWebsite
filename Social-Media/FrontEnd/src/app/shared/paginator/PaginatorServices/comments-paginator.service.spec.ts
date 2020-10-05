import { TestBed } from '@angular/core/testing';

import { CommentsPaginatorService } from './comments-paginator.service';

describe('CommentsPaginatorService', () => {
  let service: CommentsPaginatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsPaginatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
