import { TestBed } from '@angular/core/testing';

import { ZoomrxStoreService } from './zoomrx-store.service';

describe('ZoomrxStoreService', () => {
  let service: ZoomrxStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoomrxStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
