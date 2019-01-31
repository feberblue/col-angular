import { TestBed } from '@angular/core/testing';

import { LoginkondorService } from './loginkondor.service';

describe('LoginkondorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginkondorService = TestBed.get(LoginkondorService);
    expect(service).toBeTruthy();
  });
});
