import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ZoomrxTicketService } from 'src/app/services/zoomrx-ticket/zoomrx-ticket.service';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';

import { ZoomrxCreateEditCardComponent } from './zoomrx-create-edit-card.component';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('ZoomrxCreateEditCardComponent', () => {
  let component: ZoomrxCreateEditCardComponent;
  let fixture: ComponentFixture<ZoomrxCreateEditCardComponent>;
  let formBuilder: FormBuilder;
  let ticketService: ZoomrxTicketService;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let titleService: Title;
  let locationService: Location;

  const mockRouter: MockRouter = new MockRouter();

  const activatedRouteStub: ActivatedRouteStub = new ActivatedRouteStub();
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterModule],
      declarations: [ZoomrxCreateEditCardComponent],
      providers: [
        ZoomrxTicketService,
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        Title,
        Location
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomrxCreateEditCardComponent);
    formBuilder = TestBed.inject(FormBuilder);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    titleService = TestBed.inject(Title);
    locationService = TestBed.inject(Location);
    ticketService = fixture.debugElement.injector.get(ZoomrxTicketService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
