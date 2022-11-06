import { TestBed } from '@angular/core/testing';

import { EvtQueryService } from './evt-query.service';

describe('EvtQueryServiceService', () => {
  let service: EvtQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvtQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
