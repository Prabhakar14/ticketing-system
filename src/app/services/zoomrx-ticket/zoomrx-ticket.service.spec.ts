import { TestBed } from '@angular/core/testing';

import { ZoomrxTicketService } from './zoomrx-ticket.service';

describe('ZoomrxTicketService', () => {
  let service: ZoomrxTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZoomrxTicketService]
    });
    service = TestBed.inject(ZoomrxTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
