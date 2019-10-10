import { TestBed } from '@angular/core/testing';

import { NoticeService } from './notice.service';

describe('NoticeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoticeService = TestBed.get(NoticeService);
    expect(service).toBeTruthy();
  });
});
