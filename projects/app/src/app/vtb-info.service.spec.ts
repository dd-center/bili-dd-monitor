import { TestBed } from '@angular/core/testing';

import { VtbInfoService } from './vtb-info.service';

describe('VtbInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VtbInfoService = TestBed.get(VtbInfoService);
    expect(service).toBeTruthy();
  });
});
