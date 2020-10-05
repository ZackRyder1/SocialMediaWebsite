import { TestBed } from '@angular/core/testing';

import { LFFPaginatorService } from './lffpaginator.service';

describe('LFFPaginatorService', () => {
  let service: LFFPaginatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LFFPaginatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
