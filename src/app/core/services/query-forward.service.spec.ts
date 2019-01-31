import { TestBed } from '@angular/core/testing';

import { QueryForwardService } from './query-forward.service';

describe('QueryForwardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueryForwardService = TestBed.get(QueryForwardService);
    expect(service).toBeTruthy();
  });
});
