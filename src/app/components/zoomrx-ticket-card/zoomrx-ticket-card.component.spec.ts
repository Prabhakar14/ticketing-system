import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomrxTicketCardComponent } from './zoomrx-ticket-card.component';

describe('ZoomrxTicketCardComponent', () => {
  let component: ZoomrxTicketCardComponent;
  let fixture: ComponentFixture<ZoomrxTicketCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoomrxTicketCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomrxTicketCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
