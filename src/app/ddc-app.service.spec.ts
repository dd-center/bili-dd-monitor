import { TestBed } from '@angular/core/testing';

import { DdcAppService } from './ddc-app.service';

describe('DdcAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DdcAppService = TestBed.get(DdcAppService);
    expect(service).toBeTruthy();
  });
});
