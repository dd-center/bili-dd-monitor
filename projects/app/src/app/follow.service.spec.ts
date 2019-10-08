import { TestBed } from '@angular/core/testing';

import { FollowService } from './follow.service';

describe('FollowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FollowService = TestBed.get(FollowService);
    expect(service).toBeTruthy();
  });
});
