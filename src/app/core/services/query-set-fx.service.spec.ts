import { TestBed } from '@angular/core/testing';

import { QuerySetFxService } from './query-set-fx.service';

describe('QuerySetFxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuerySetFxService = TestBed.get(QuerySetFxService);
    expect(service).toBeTruthy();
  });
});
