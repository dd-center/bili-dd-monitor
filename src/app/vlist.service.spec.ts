import { TestBed } from '@angular/core/testing';

import { VlistService } from './vlist.service';

describe('VlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VlistService = TestBed.get(VlistService);
    expect(service).toBeTruthy();
  });
});
