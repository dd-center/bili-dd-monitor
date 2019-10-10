import { TestBed } from '@angular/core/testing';

import { LivePlayService } from './live-play.service';

describe('LivePlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LivePlayService = TestBed.get(LivePlayService);
    expect(service).toBeTruthy();
  });
});
