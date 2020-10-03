import { TestBed } from '@angular/core/testing';

import { ZoomrxDashboardService } from './zoomrx-dashboard.service';

describe('ZoomrxDashboardService', () => {
  let service: ZoomrxDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZoomrxDashboardService]
    });
    service = TestBed.inject(ZoomrxDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
