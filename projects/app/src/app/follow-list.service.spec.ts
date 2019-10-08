import { TestBed } from '@angular/core/testing';

import { FollowListService } from './follow-list.service';

describe('FollowListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FollowListService = TestBed.get(FollowListService);
    expect(service).toBeTruthy();
  });
});
